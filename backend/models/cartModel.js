const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    cartItems: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },

        price: {
          type: Number,
        },
        imageCover: String,
        color: String,
      },
    ],
    totalCartPrice: {
      type: Number,
    },
    coupon: {
      type: String,
      default: null,
    },
    totalCartPriceAfterDiscount: {
      type: Number,
    },
    totalCartItems: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "cartItems.product",
    select:
      "_id name images colors price priceAfterDiscount quantity avgRating",
  });

  next();
});

module.exports = mongoose.model("Cart", cartSchema);
