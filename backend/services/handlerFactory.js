const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const FeaturesApi = require("../utils/featuresApi");

exports.addOne = (Model, modelName = "") =>
  asyncHandler(async (req, res) => {
    let document = await Model.create(req.body);
    if (modelName === "subcategory") {
      document = await document.populate({ path: "category", select: "name" });
    } else if (modelName === "review") {
      document = await document.populate({ path: "user", select: "name" });
    }
    // else if(modelName === "cart"){
    //   document = await document.populate({ path: "cartItems.product", select: "name imageCover rating" });
    // }
    res.status(201).json(document);
  });

exports.getMany = (Model, modelName = "") =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    // console.log(filter);

    const { mongooseQuery, paginationResult } = await new FeaturesApi(
      modelName === "product"
        ? Model.find(filter)
            .populate("category", "name")
            .populate("brand", "name")
        : Model.find(filter),
      req.query
    )
      .search()
      .filter()
      .sort()
      .select()
      .paginate();

    const documents = await mongooseQuery;

    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    if (!req.filterObj) {
      req.filterObj = {};
    }

    req.filterObj._id = id;

    const document = await Model.findOne(req.filterObj);

    if (!document) {
      return next(new ApiError(`No document found for this id ${id}`), 404);
    }
    res.status(200).json({ data: document });
  });

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const document = await Model.findById(id);

    if (!document) {
      return next(new ApiError(`No document found for this id ${id}`), 404);
    }
    await document.remove();
    // document.remove();
    res.status(200).json({
      data: document,
    });
  });

exports.updateOne = (Model, modelName = "") =>
  asyncHandler(async (req, res, next) => {
    id = req.params.id;
    let document = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!document) {
      return next(new ApiError(`No document found for this id ${id}`, 404));
    }
    if (modelName === "subcategory") {
      document = await document.populate({ path: "category", select: "name" });
    }
    document.save();
    res.status(200).json(document);
  });
