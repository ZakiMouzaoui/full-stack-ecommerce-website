const {
  validatorMiddleware,
} = require("../../middlewares/validatorMiddleware");
const { body } = require("express-validator");
const User = require("../../models/userModel");
const { default: slugify } = require("slugify");

exports.loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email field is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password field is required"),
  validatorMiddleware,
];

exports.signUpValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name field is required")
    .isLength({ min: 3 })
    .withMessage("Too short User name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  body("email")
    .notEmpty()
    .withMessage("Email field is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        return Promise.reject(
          new Error("A user already exists with this email")
        );
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("Password field is required")
    .isLength({ min: 6 })
    .withMessage("Make sure your password is at least 6 characters long"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Password confirmation field is required")
    .custom((val, { req }) => {
      if (val !== req.body.password) {
        throw new Error("Passwords are not matching");
      }
      return true;
    }),
  validatorMiddleware,
];

exports.forgotPasswordValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email field is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const user = User.findOne({ email });
      if (!user) {
        return Promise.reject(
          new Error("No user was found with this email address")
        );
      }
      return true;
    }),
  validatorMiddleware,
];

exports.resetPasswordValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email field is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const user = User.findOne({ email });
      if (!user) {
        return Promise.reject(
          new Error("No user was found with this email address")
        );
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("Password field is required")
    .isLength({ min: 6 })
    .withMessage("Make sure your password is at least 6 characters long"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Password confirmation field is required")
    .custom((val, { req }) => {
      if (val !== req.body.password) {
        throw new Error("Passwords are not matching");
      }
      return true;
    }),
  validatorMiddleware,
];
