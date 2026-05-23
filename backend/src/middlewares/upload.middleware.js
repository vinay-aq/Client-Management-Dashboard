const multer = require("multer");
const AppError = require("../utils/AppError");
const path = require("path")


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,  path.resolve("src/uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

function fileFilter(req, file, cb) {

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError("Only image files allowed", 400), false);
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;
