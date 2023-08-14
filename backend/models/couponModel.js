const mongoose = require("mongoose");

const couponSchema = mongoose.Schema(
  {
    code: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Coupon code is required"],
    },
    usageLimit: {
      type: Number,
      requierd: [true, "Coupon usage limit is required"],
    },
    usageCount: {
      type: Number,
      default: 0,
    },
    discountType: {
      type: String,
      enum: {
        values: ["percent", "value"],
        message: "{VALUE} is not supported",
      },
    },
    discount: {
      type: Number,
      required: [true, "Coupon discount is required"],
      min: [0, "Coupon disount can not be negative"],
    },
    expireDate: {
      type: Date,
      required: [true, "Coupon exire date is required"],
    },
    minPrice: {
      type: Number,
      default: 0,
    },
    users: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
        redeemCount: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Coupon", couponSchema);
