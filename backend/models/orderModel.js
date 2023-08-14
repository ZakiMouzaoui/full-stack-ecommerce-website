const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    trackingCode: String,
    orderItems: [
      {
        product: { type: mongoose.Schema.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number,
        color: String,
      },
    ],
    couponCode: String,
    taxPrice: Number,
    shippingAddress: {
      city: String,
      postalCode: String,
      street: String,
      details: String,
      phone: String,
    },
    shippingPrice: {
      type: Number,
      default: 10,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: Date,
    totalOrderPrice: Number,
    paymentMethod: {
      type: String,
      enum: {
        values: ["cach", "card"],
        message: "{VALUE} is not supported",
        default: "cach",
      },
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
  },
  {
    timestamps: true,
  }
);

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name profileImg email phone",
  }).populate({
    path: "orderItems.product",
    select: "_id name images avgRating",
  });

  next();
});

module.exports = mongoose.model("Order", orderSchema);
