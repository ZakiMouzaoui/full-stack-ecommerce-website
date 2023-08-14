const {
  validatorMiddleware,
} = require("../../middlewares/validatorMiddleware");
const slugify = require("slugify");
const { check, body } = require("express-validator");
const Category = require("../../models/categoryModel");

exports.createCategoryValidator = [
  body("image").notEmpty().withMessage("Category image is required"),
  body("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name")
    .custom((name, { req }) => {
      req.body.slug = slugify(name);
      return true;
    }),
  validatorMiddleware,
];

exports.updateCategoryValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid id format")
    .custom(async (id) => {
      const category = await Category.findById(id);
      if (!category) {
        return Promise.reject(new Error("No category was found for this id"));
      }
    }),
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name")
    .custom((name, { req }) => {
      req.body.slug = slugify(name);
      return true;
    }),
  body("image").optional(),
  validatorMiddleware,
];
