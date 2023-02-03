const { validation } = require("../../middleware/validation");
const {
  signUpv,
  signin,
  send1,
  validateToken,
  forgetPassword,
} = require("./controller/auth.validation");
const {
  signup,
  confirmEmail,
  signIn,
  sendCode,
  ForgetPassword,
  refreshToken,
} = require("./controller/controller");

const router = require("express").Router();
router.post("/signup", validation(signUpv), signup);
router.get("/confirmEmail/:token", validation(validateToken), confirmEmail);
router.get("/reftoken/:token", validation(validateToken), refreshToken);
router.get("/signin", validation(signin), signIn);
router.get("/sendCode", validation(send1), sendCode);
router.get("/forgetpassword", validation(forgetPassword), ForgetPassword);

module.exports = router;
