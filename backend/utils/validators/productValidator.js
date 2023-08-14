const {
  validatorMiddleware,
} = require("../../middlewares/validatorMiddleware");
const slugify = require("slugify");
const { check, body } = require("express-validator");
const Category = require("../../models/categoryModel");
const SubCategory = require("../../models/subCategoryModel");

exports.createProductValidator = [
  // body("imageCover").notEmpty().withMessage("Product image is required"),
  body("name")
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 4 })
    .withMessage("Too short product name")
    .isLength({ max: 32 })
    .withMessage("Too long product name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  body("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 200 })
    .withMessage("Too long product description")
    .isLength({ min: 10 })
    .withMessage("Too short product description"),
  body("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity should be a number")
    .isFloat({ min: 0 })
    .withMessage("Product quantity can't be negative"),
  body("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isFloat()
    .withMessage("Product price must be a number")
    .isLength({ max: 32 })
    .withMessage("To long price"),
  body("priceAfterDiscount")
    .optional()
    .custom((val, { req }) => {
      if (parseInt(val) < 0) {
        throw new Error("The price after discount can't be negative");
      }
      if (parseInt(val) > parseInt(req)) {
        throw new Error(
          "The price after discount can't be greater than the original price"
        );
      }
      return true;
    }),
  body("colors")
    .optional()
    .isArray()
    .withMessage("Product colors should be an array of string"),
  check("images")
    .notEmpty()
    .withMessage("Images field is required")
    .isArray()
    .withMessage("Product images should be an array of string")
    .custom((val) => {
      if (val.length < 2) {
        throw new Error("A product must have at least 2 images");
      }
      return true;
    }),
  check("category")
    .notEmpty()
    .withMessage("Category field is required")
    .isMongoId()
    .withMessage("Invalid id format for category")
    .custom(async (val, { _ }) => {
      const category = await Category.findById(val);
      if (!category) {
        return Promise.reject(new Error("No category was found with this id"));
      }
      return true;
    }),
  check("subcategories")
    .optional()
    .custom(async (val) => {
      const result = await SubCategory.find({
        _id: { $exists: true, $in: val },
      });
      if (result.length < 1 || result.length !== val.length) {
        return Promise.reject(new Error("Invalid subcategories ids"));
      }
    })
    .custom((val, { req }) =>
      SubCategory.find({ category: req.body.category }).then(
        (subcategories) => {
          const subCategoriesIdsInDB = [];
          subcategories.forEach((subCategory) => {
            subCategoriesIdsInDB.push(subCategory._id.toString());
          });
          // check if subcategories ids in db include subcategories in req.body (true)
          const checker = (target, arr) => target.every((v) => arr.includes(v));
          if (!checker(val, subCategoriesIdsInDB)) {
            return Promise.reject(
              new Error(`Subcategories do not belong to this category`)
            );
          }
        }
      )
    ),

  body("brand")
    .notEmpty()
    .withMessage("Brand field is required")
    .isMongoId()
    .withMessage("Invalid id format for brand"),
  body("avgRating")
    .optional()
    .isNumeric()
    .withMessage("The rating must be a number")
    .isFloat({ min: 1 })
    .withMessage("The rating must be above or equal 1")
    .isFloat({ max: 5 })
    .withMessage("The rating must be below or equal 5"),
  body("ratingsCount")
    .optional()
    .isNumeric()
    .withMessage("Ratings count must be a number"),

  validatorMiddleware,
];

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  body("name")
    .optional()
    .isLength({ min: 4 })
    .withMessage("Too short product name")
    .isLength({ max: 32 })
    .withMessage("Too long product name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  body("description").optional(),
  //   body("imageCover").optional(),
  //   body("images").optional(),
  body("category").optional().isMongoId().withMessage("Invalid id format"),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid id format"),
  validatorMiddleware,
];
