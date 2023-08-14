const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel");

const factory = require("../services/handlerFactory");

const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const generateTrackingCode = () => {
  const date = Date.now().toString();
  return `${date.substring(0, 3)}-${date.substring(3, 8)}-${date.substring(8)}`;
};

exports.createCachOrder = asyncHandler(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user._id });
  const coupon = req.couponObj;

  if (!cart) {
    return new ApiError(`No cart was found for this id: ${req.user._id}`);
  }

  // app settings
  const taxPrice = 0;
  const shippingPrice = 10;
  let totalPrice = cart.totalCartPrice;

  let discount = 0;

  if (coupon) {
    if (coupon.discountType === "value") {
      if (totalPrice < coupon.minPrice) {
        return next(
          new ApiError(
            `Your cart total price should be at least ${coupon.minPrice} $`
          )
        );
      }
      discount = coupon.discount;
    } else {
      discount = ((totalPrice * coupon.discount) / 100).toFixed(2);
    }

    coupon.usageCount += 1;
    const userIndex = coupon.users.findIndex(
      (user) => user.user.toString() === req.user._id.toString()
    );

    if (userIndex === -1) {
      coupon.users.push({
        user: req.user._id,
        redeemCount: 1,
      });
    } else {
      coupon.users[userIndex].redeemCount += 1;
    }

    await coupon.save();
  }

  totalPrice = (totalPrice - discount + shippingPrice + taxPrice).toFixed(2);

  const order = await Order.create({
    trackingCode: generateTrackingCode(),
    user: req.user._id,
    orderItems: cart.cartItems,
    shippingPrice,
    totalOrderPrice: totalPrice,
    shippingAddress: req.body.shippingAddress,
    couponCode: coupon.code,
  });

  if (order) {
    const bulkOptions = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
      },
    }));
    await Product.bulkWrite(bulkOptions, {});
    await cart.remove();
  }

  res.status(201).json({
    status: "Success",
    data: order,
  });
});

exports.checkoutSession = asyncHandler(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return new ApiError(`No cart was found for this id: ${req.user._id}`);
  }

  // 3) Create stripe checkout session
  const line_items = cart.cartItems.map((item) => {
    // const imgUrl = `http://127.0.0.1:8000/products/${item.imageCover}`;

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
          // images: [imgUrl],
          description: item.product.description,
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });
  const couponObj = req.couponObj;

  let coupon;
  const { city, street, details, phone, postalCode } = req.body.shippingAddress;
  const metadata = { city, street, details, phone, postalCode };

  if (couponObj) {
    metadata.couponCode = couponObj.code;
    coupon = await stripe.coupons.create({
      percent_off:
        couponObj.discountType === "percent" ? couponObj.discount : undefined,
      amount_off:
        couponObj.discountType === "value"
          ? couponObj.discount * 100
          : undefined,
      currency: "usd",
      name: couponObj.code,
      max_redemptions: couponObj.usageLimit,
    });
    couponQuery = `$coupon_code=${coupon.name}`;
  }

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${req.protocol}://localhost:3000/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.protocol}://localhost:3000/cart`,
    customer_email: req.user.email,
    client_reference_id: cart._id.toString(),
    metadata,

    discounts: [
      {
        coupon: coupon?.id,
      },
    ],
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1000,
            currency: "usd",
          },
          display_name: "Next day air",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 3,
            },
          },
        },
      },
    ],
  });

  // 4) send session to response
  res.status(200).json({ status: "success", session });
});

exports.createCardOrder = asyncHandler(async (req, res, next) => {
  const { sessionId } = req.body;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  let order;

  if (session) {
    const cart = await Cart.findById(session.client_reference_id);
    const { city, street, details, phone, postalCode } = session.metadata;
    const oderPrice = session.amount_total / 100;
    const code = session.metadata.couponCode;

    if (code !== undefined) {
      const coupon = await Coupon.findOne({ code });
      if (!coupon) {
        return new ApiError("Invalid coupon code", 400);
      }

      coupon.usageCount += 1;
      const userIndex = coupon.users.findIndex(
        (user) => user.user.toString() === req.user._id.toString()
      );

      if (userIndex === -1) {
        coupon.users.push({
          user: req.user._id,
          redeemCount: 1,
        });
      } else {
        coupon.users[userIndex].redeemCount += 1;
      }

      await coupon.save();
    }

    order = await Order.create({
      user: req.user._id,
      trackingCode: generateTrackingCode(),
      orderItems: cart.cartItems,
      shippingAddress: { city, street, details, phone, postalCode },
      totalOrderPrice: oderPrice,
      isPaid: true,
      paidAt: Date.now(),
      paymentMethod: "card",
      couponCode: code,
    });

    // After creating order, decrement product quantity, increment product sold
    if (order) {
      const bulkOptions = cart.cartItems.map((item) => ({
        updateOne: {
          filter: { _id: item.product },
          update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
        },
      }));
      await Product.bulkWrite(bulkOptions, {});
      await cart.remove();
    }
  }

  res.status(200).json({ data: order });
});

// exports.webhookCheckout = asyncHandler(async (req, res, next) => {
//   const sig = req.headers["stripe-signature"];

//   let event;
//   let couponCode = "";

//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

// switch (event.type) {
//   case "coupon.created":
//     const couponObj = event.data.object;
//     couponCode = couponObj.name;
//     break;
//   case "checkout.session.completed":
//     // console.log(event.data.object);
//     // console.log(couponCode);
//     const res = await createCardOrder(event.data.object, couponCode);
//     console.log(res);
//     break;

//   default:
//   //TODO
// }

// res.status(200).json({ received: true });

exports.changeOrderToPaid = asyncHandler(async (req, res, _next) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      isPaid: true,
      paidAt: Date.now(),
    },
    { new: true }
  );

  res.status(200).json({
    status: "Success",
    data: order,
  });
});

exports.changeOrderToDelivered = asyncHandler(async (req, res, _next) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      isDelivered: true,
      deliveredAt: Date.now(),
    },
    { new: true }
  );

  // const io = socket.getSocketIOInstance(); // Get the socket.io instance
  // console.log(io);

  // // Emit a notification event to the specific user
  // io.to(req.user._id).emit("notification", {
  //   content: "Your order has been delivered successfully!",
  // });

  res.status(200).json({
    status: "Success",
    data: order,
  });
});

exports.filterOrderForLoggedUser = asyncHandler(async (req, _res, next) => {
  if (req.user.role === "user") {
    req.filterObj = {
      user: req.user._id,
    };
  }
  next();
});

exports.getOrders = factory.getMany(Order);

exports.getOrder = factory.getOne(Order);

// EXPERIMENTAL ONLY
exports.deleteOrder = factory.deleteOne(Order);
