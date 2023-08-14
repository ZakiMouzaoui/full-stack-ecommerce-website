const express = require("express");

const { protect, allowedTo } = require("../services/authService");
const {
  getCoupons,
  addCoupon,
  updateCoupon,
  getCoupon,
  deleteCoupon,
} = require("../services/couponService");
const { addCouponValidator } = require("../utils/validators/couponValidator");

const router = express.Router();

router.use(protect, allowedTo("admin", "manager"));

router.route("/").get(getCoupons).post(addCouponValidator, addCoupon);
router.route("/:id").get(getCoupon).put(updateCoupon).delete(deleteCoupon);

module.exports = router;
