const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  verifyResetCode,
} = require("./../services/authService");
const {
  loginValidator,
  signUpValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../utils/validators/authValidator");

router.post("/signup", signUpValidator, signup);
router.post("/login", loginValidator, login);
router.post("/forgotPassword", forgotPasswordValidator, forgotPassword);
router.post("/verifyResetCode", verifyResetCode);
router.put("/resetPassword", resetPasswordValidator, resetPassword);

module.exports = router;
