const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const ApiError = require("../utils/apiError");
const Coupon = require("../models/couponModel");

const calcTotalCartPriceAndTotalItems = (cart) => {
  let totalPrice = 0;
  let totalItems = 0;

  cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
    totalItems += item.quantity;
  });

  cart.totalCartPrice = totalPrice.toFixed(2);
  cart.totalCartItems = totalItems;
  cart.totalCartPriceAfterDiscount = undefined;
};

exports.addItemToCart = asyncHandler(async (req, res, _next) => {
  const { productId, color } = req.body;
  const product = await Product.findById(productId);

  let cart = await Cart.findOne({ user: req.user._id });

  // IF CART DOES NOT EXIST
  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [
        {
          product: productId,
          price: product.priceAfterDiscount || product.price,
          imageCover: product.images[0],
          color,
        },
      ],
    });
  } else {
    // CHECK IF PRODUCT ALREADT IN CART
    const productIdx = cart.cartItems.findIndex(
      (item) =>
        item.product._id.toString() === productId && item.color === color
    );

    if (productIdx === -1) {
      cart.cartItems.push({
        product: productId,
        price: product.priceAfterDiscount || product.price,
        imageCover: product.images[0],
        color,
      });
    } else {
      // WE UPDATE THE PRODUCT QUANTITY
      cart.cartItems[productIdx].quantity += 1;
    }
  }
  calcTotalCartPriceAndTotalItems(cart);
  cart.coupon = undefined;
  cart.totalCartPriceAfterDiscount = undefined;
  cart.save();
  res.status(201).json({
    status: "Success",
    message: "Product added to cart successfully",
    data: cart.cartItems,
    totalItems: cart.totalCartItems,
    totalCartPrice: cart.totalCartPrice,
    totalCartPriceAfterDiscount: undefined,
  });
});

exports.updateItemQuantity = asyncHandler(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user._id });

  const itemIdx = cart.cartItems.findIndex(
    (item) => item._id.toString() === req.params.itemId
  );

  if (itemIdx !== -1) {
    cart.cartItems[itemIdx].quantity = req.body.quantity;
    calcTotalCartPriceAndTotalItems(cart);
    cart.coupon = undefined;
    cart.totalCartPriceAfterDiscount = undefined;
    cart.save();

    res.status(200).json({
      status: "Success",
      message: "Item updated successfully",
      data: cart.cartItems,
      totalItems: cart.totalCartItems,
      totalPrice: cart.totalCartPrice,
    });
  } else {
    return next(
      new ApiError(`No item found for this id: ${req.params.itemId}`, 404)
    );
  }
});

exports.removeItemFromCart = asyncHandler(async (req, res, next) => {
  let cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: {
        cartItems: {
          _id: req.params.itemId,
        },
      },
    },
    {
      new: true,
    }
  );

  calcTotalCartPriceAndTotalItems(cart);
  cart.totalCartPriceAfterDiscount = undefined;
  cart.coupon = undefined;
  cart.save();

  res.status(200).json({
    status: "Success",
    message: "Item deleted from cart successfully",
    data: cart.cartItems,
    totalItems: cart.totalCartItems,
    totalPrice: cart.totalCartPrice,
    totalCartPriceAfterDiscount: undefined,
  });
});

exports.getUserCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(200).json({
      data: [],
      totalItems: 0,
      totalCartPrice: 0,
      totalCartPriceAfterDiscount: null,
    });
  } else {
    cart.coupon = undefined;
    cart.totalCartPriceAfterDiscount = undefined;
    cart.save();
    res.status(200).json({
      data: cart.cartItems,
      totalItems: cart.totalCartItems,
      totalCartPrice: cart.totalCartPrice,
      totalCartPriceAfterDiscount: null,
      discount: 0,
    });
  }
});

exports.applyCoupon = asyncHandler(async (req, res, next) => {
  // const coupon = await Coupon.findOne({ code: req.body.code });
  const coupon = req.couponObj;

  const cart = await Cart.findOne({ user: req.user._id });
  let discount;

  if (coupon.discountType === "value") {
    if (cart.totalCartPrice < coupon.minPrice) {
      return next(
        new ApiError(
          `Your cart total price should be at least ${coupon.minPrice} $`
        )
      );
    }
    discount = coupon.discount;
  } else {
    discount = ((cart.totalCartPrice * coupon.discount) / 100).toFixed(2);
  }
  cart.totalCartPriceAfterDiscount = (cart.totalCartPrice - discount).toFixed(
    2
  );
  cart.coupon = req.body.code;
  await cart.save();

  res.status(200).json({
    totalCartPriceAfterDiscount: cart.totalCartPriceAfterDiscount,
    discount: discount,
    coupon: req.body.code,
  });
});

exports.clearUserCart = asyncHandler(async (req, res, next) => {
  await Cart.findOneAndDelete({ user: req.user._id, coupon: null });

  res.status(204).json({
    data: [],
    totalItems: 0,
    totalCartPrice: 0,
    totalCartPriceAfterDiscount: null,
  });
});
