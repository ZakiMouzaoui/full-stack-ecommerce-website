const multer = require("multer");
const ApiError = require("./../utils/apiError");

const multerOptions = () => {
  const multerStorage = multer.memoryStorage();

  const multerFilter = function (req, file, cb) {
    console.log(file.mimetype);
    if (
      file.mimetype.startsWith("image") ||
      file.mimetype === "application/octet-stream"
    ) {
      cb(null, true);
    } else {
      cb(new ApiError("Invalid image format", 400), false);
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

  return upload;
};

exports.uploadSingleImage = (filename) => multerOptions().single(filename);
exports.uploadMixOfImages = (fields) => multerOptions().fields(fields);
