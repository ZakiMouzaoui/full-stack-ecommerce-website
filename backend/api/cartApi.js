const express = require("express");

const router = express.Router();

const { protect, allowedTo } = require("../services/authService");

const {
  addItemToCart,
  clearUserCart,
  getUserCart,
  updateItemQuantity,
  removeItemFromCart,
  applyCoupon,
} = require("../services/cartService");
const { applyCouponValidator } = require("../utils/validators/couponValidator");

router.use(protect, allowedTo("user"));

router.route("/").get(getUserCart).post(addItemToCart).delete(clearUserCart);
router.put("/applyCoupon", applyCouponValidator, applyCoupon);
router.route("/:itemId").put(updateItemQuantity).delete(removeItemFromCart);

module.exports = router;
