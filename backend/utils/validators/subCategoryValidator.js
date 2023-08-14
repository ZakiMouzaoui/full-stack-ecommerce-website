const {
  validatorMiddleware,
} = require("../../middlewares/validatorMiddleware");
const slugify = require("slugify");
const { check, body } = require("express-validator");
const Category = require("../../models/categoryModel");

exports.createSubCategoryValidator = [
  body("name")
    .notEmpty()
    .withMessage("SubCategory name is required")
    .isLength({ min: 3 })
    .withMessage("Too short subCategory name")
    .isLength({ max: 32 })
    .withMessage("Too long subCategory name")
    .custom((name, { req }) => {
      req.body.slug = slugify(name);
      return true;
    }),
  check("category")
    .notEmpty()
    .withMessage("Category field is required")
    .isMongoId()
    .withMessage("Invalid id format")
    .custom(async (id) => {
      const category = await Category.findById(id);
      if (!category) {
        return Promise.reject(new Error("No category found with this id"));
      }
      return true;
    }),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  body("category")
    .notEmpty()
    .withMessage("Category field is required")
    .isMongoId()
    .withMessage("Invalid id format for category")
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
    .withMessage("SubCategory name is required")
    .isLength({ min: 3 })
    .withMessage("Too short subcategory name")
    .isLength({ max: 32 })
    .withMessage("Too long subcategory name")
    .custom((name, { req }) => {
      req.body.slug = slugify(name);
      return true;
    }),
  body("image").optional(),
  validatorMiddleware,
];
