const express = require("express");

const router = express.Router();

const {
  getAddresses,
  addAddress,
  removeAddress,
  editAddress,
} = require("../services/addressService");

const { protect, allowedTo } = require("../services/authService");
const {
  addAddressdValidator,
  updateAddressValidator,
} = require("../utils/validators/addressValidator");
router.use(protect, allowedTo("user"));

router.route("/").get(getAddresses).post(addAddressdValidator, addAddress);
router
  .route("/:addressId")
  .put(updateAddressValidator, editAddress)
  .delete(removeAddress);

module.exports = router;
