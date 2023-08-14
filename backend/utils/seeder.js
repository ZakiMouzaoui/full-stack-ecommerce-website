const fs = require("fs");
const databaseConn = require("../config/database");
const dotenv = require("dotenv");
const Product = require("../models/productModel");
const Brand = require("../models/brandModel");
const products = JSON.parse(fs.readFileSync("./dummy_data/products.json"));
// const brands = JSON.parse(fs.readFileSync("./brands.json"));

dotenv.config({ path: "../config.env" });

databaseConn();

const insertData = async () => {
  await Product.create(products);
  // await Brand.create(brands);
  console.log("items created");
  process.exit();
};

const deleteData = async () => {
  await Product.deleteMany();
  // await Brand.deleteMany();
  console.log("items deleted");
  process.exit();
};

if (process.argv[2] == "-i") {
  insertData();
} else if (process.argv[2] == "-d") {
  deleteData();
}
