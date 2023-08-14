const {
  validatorMiddleware,
} = require("../../middlewares/validatorMiddleware");
const { body } = require("express-validator");
const Coupon = require("../../models/couponModel");
const Cart = require("../../models/cartModel");

exports.addCouponValidator = [
  body("code")
    .notEmpty()
    .withMessage("Coupon code is required")
    .custom(async (code) => {
      const coupon = await Coupon.findOne({ code });
      if (coupon) {
        return Promise.reject(new Error("This code is already in use"));
      }
      return true;
    }),
  body("expireDate").isDate().withMessage("Invalid date format for expiration"),
  body("usageLimit").notEmpty().withMessage("Usage limit is required"),
  body("discountType").notEmpty().withMessage("Coupon type is required"),
  body("discount")
    .isNumeric()
    .withMessage("Discount value must be a number")
    .custom((val) => {
      if (parseInt(val, 10) <= 0) {
        throw new Error("Invalid value for discount");
      }
      return true;
    }),
  validatorMiddleware,
];

exports.applyCouponValidator = [
  body("code").custom(async (code, { req }) => {
    if (code !== null && code !== undefined) {
      const coupon = await Coupon.findOne({
        code,
        expireDate: { $gt: Date.now() },
      });
      if (!coupon) {
        return Promise.reject(
          new Error("Invalid coupon code or coupon has expired")
        );
      }

      // CHECK IF COUPON HAS REACH MAX USAGE LIMIT
      if (coupon.usageCount === coupon.usageLimit) {
        throw new Error("This coupon has reached the maximum usage limit");
      }
      // coupon.users = [];
      // await coupon.save();

      // CHECK IF USER HAS NOT REACHED THE MAX REDEEM
      const userCoupon = coupon.users.find((userCoupon) =>
        userCoupon.user.equals(req.user._id)
      );

      if (userCoupon && userCoupon.redeemCount >= 3) {
        throw new Error("User has exceeded coupon usage limit");
      }
      req.couponObj = coupon;
    }

    return true;
  }),
  validatorMiddleware,
];
