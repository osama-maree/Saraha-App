const { nanoid } = require("nanoid");
const multer = require("multer");
//this file for upload files
const multerValidation = {
  image: ["image/jpeg", "image/png"],
  pdf: ["application/pdf"],
};
const HME = (error, req, res, next) => {
  if (error) {
    res.status(400).json({ message: "multer", error });
  } else {
    next();
  }
};
function myMulter(customvalidation) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + nanoid() + "_" + file.originalname);
    },
  });
  function fileFilter(req, file, cb) {
    if (customvalidation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb("invalid file type", false);
    }
  }
  const upload = multer({ dest: "upload", fileFilter, storage });
  return upload;
}
module.exports = { myMulter, HME, multerValidation };
