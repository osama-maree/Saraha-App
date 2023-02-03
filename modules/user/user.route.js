const { auth } = require("../../middleware/auth");
const { myMulter, HME, multerValidation } = require("../../services/multer");
const {validation}=require('./../../middleware/validation')
const {
  updatePassword,
  allUser,
  uploadPic,
} = require("./controller/controller");
const { updatepass } = require("./controller/user.validation");

const router = require("express").Router();

router.patch("/update", auth(),validation(updatepass), updatePassword);
router.get("/getall", allUser);
router.patch("/profile/pic",auth(), myMulter(multerValidation.image).single("image"), HME, uploadPic);
module.exports = router;
