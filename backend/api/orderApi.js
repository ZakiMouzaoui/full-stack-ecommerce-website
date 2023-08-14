const express = require("express");

const router = express.Router();

const { protect, allowedTo } = require("../services/authService");
const {
  getOrder,
  getOrders,
  changeOrderToPaid,
  changeOrderToDelivered,
  createCachOrder,
  filterOrderForLoggedUser,
  deleteOrder,
  checkoutSession,
  createCardOrder,
} = require("../services/orderService");
const { applyCouponValidator } = require("../utils/validators/couponValidator");

router.use(protect);

router.post("/", allowedTo("user"), applyCouponValidator, createCachOrder);
router.get("/", filterOrderForLoggedUser, getOrders);
router.post(
  "/checkout-session",
  allowedTo("user"),
  applyCouponValidator,
  checkoutSession
);
router.post("/card-order", allowedTo("user"), createCardOrder);

router.get("/:id", filterOrderForLoggedUser, getOrder);
router.delete("/:id", deleteOrder);
router.put("/:id/pay", allowedTo("admin", "manager"), changeOrderToPaid);
router.put(
  "/:id/deliver",
  allowedTo("admin", "manager"),
  changeOrderToDelivered
);

module.exports = router;
