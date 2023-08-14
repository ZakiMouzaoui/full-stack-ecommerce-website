const subCategoryModel = require("../models/subCategoryModel");
const factory = require("./handlerFactory");

exports.setCategoryIdToBody = (req, _, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// Nested route
exports.createFilterObj = (req, _, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};

exports.getSubCategories = factory.getMany(subCategoryModel);

exports.getSubCategory = factory.getOne(subCategoryModel);

exports.addSubCategory = factory.addOne(subCategoryModel, "subcategory");

exports.updateSubCategory = factory.updateOne(subCategoryModel, "subcategory");

exports.deleteSubCategory = factory.deleteOne(subCategoryModel);
