const express = require("express");
const {
  getSubCategories,
  getSubCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
  createFilterObj,
} = require("../services/subCategoryService");

const { protect, allowedTo } = require("./../services/authService");

const router = express.Router({ mergeParams: true });
const {
  createSubCategoryValidator,
  updateSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

router.route("/").get(createFilterObj, getSubCategories).post(
  protect,
  allowedTo("admin", "manager"),
  createSubCategoryValidator,

  addSubCategory
);

router
  .route("/:id")
  .get(getSubCategory)
  .put(
    protect,
    allowedTo("admin", "manager"),
    updateSubCategoryValidator,
    updateSubCategory
  )
  .delete(protect, allowedTo("admin"), deleteSubCategory);

module.exports = router;
