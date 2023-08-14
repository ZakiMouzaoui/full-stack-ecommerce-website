const databaseConn = require("../config/database");
const dotenv = require("dotenv");
const Product = require("../models/productModel");

dotenv.config({ path: "../config.env" });

databaseConn();

const updateData = async () => {
  await Product.updateMany(
    { name: "Puma RS-0 Sneakers" },
    {
      avgRating: 3,
    },
    {
      multi: true,
    }
  );
  console.log("items updated");
  process.exit();
};

updateData();
