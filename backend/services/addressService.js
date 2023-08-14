const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { use } = require("../api/subCategoryApi");
const ApiError = require("../utils/apiError");

exports.getAddresses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    status: "Success",
    data: user.addresses,
    shippingAddress: user.shippingAddress,
    results: user.addresses.length,
  });
});

exports.addAddress = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: {
        addresses: req.body,
      },
    },
    { new: true }
  );

  // WE SET THE FIRST ADDRESS AS THE DEFAULT ADDRESS
  if (user.addresses.length === 1) {
    user.shippingAddress = user.addresses[0]._id;
  }
  await user.save();

  res.status(200).json({
    status: "Success",
    data: user.addresses,
    shippingAddress: user.shippingAddress,
    message: "Address added successfully",
    results: user.addresses.length,
  });
});

exports.editAddress = asyncHandler(async (req, res) => {
  // const user = await User.findOneAndUpdate(
  //   {
  //     _id: req.user._id,
  //     "addresses._id": req.params.addressId,
  //   },
  //   {
  //     $set: {
  //       "addresses.$": req.body,
  //     },
  //   },
  //   {
  //     new: true,
  //   }
  // );
  const user = await User.findOne({
    _id: req.user._id,
  });
  const addressId = req.params.addressId;
  const index = user.addresses.findIndex(
    (add) => add._id.toString() === addressId.toString()
  );

  if (index === -1) {
    return next(new ApiError("No address found with this id"));
  }
  const { city, street, details, phone, postalCode } = req.body;

  user.addresses[index] = {
    city,
    street,
    details,
    phone,
    postalCode,
    _id: addressId,
  };

  if (req.body.isShipping === true) {
    user.shippingAddress = addressId;
  }

  await user.save();
  res.status(200).json({
    status: "Success",
    data: user.addresses,
    shippingAddress: user.shippingAddress,
    message: "Address updated successfully",
    results: user.addresses.length,
  });
});

exports.removeAddress = asyncHandler(async (req, res) => {
  // const user = await User.findByIdAndUpdate(
  //   req.user._id,
  //   {
  //     $pull: {
  //       addresses: {
  //         _id: req.params.addressId,
  //       },
  //     },
  //   },
  //   { new: true }
  // );
  const user = await User.findOne({
    _id: req.user._id,
  });
  const addressId = req.params.addressId;
  const index = user.addresses.findIndex(
    (add) => add._id.toString() === addressId.toString()
  );

  if (index === -1) {
    return next(new ApiError("No address found with this id"));
  }

  if (
    user.addresses[index]._id.toString() === user.shippingAddress.toString() ||
    user.addresses.length === 1
  ) {
    user.shippingAddress = user.addresses[0]._id;
  }

  user.addresses = user.addresses.splice(0, index);

  await user.save();

  res.status(200).json({
    status: "Success",
    data: user.addresses,
    shippingAddress: user.shippingAddress,
    message: "Address removed successfully",
    results: user.addresses.length,
  });
});
