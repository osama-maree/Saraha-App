const jwt = require("jsonwebtoken");
const { userModel } = require("../DB/model/user.model");
const auth = () => {
  return async (req, res, next) => {
    let { token } = req.headers;
    if (!token.startsWith(process.env.authBearerToken)) {
      res.json({ message: "error token" });
    } else {
      token = token.split("__")[1];
      const decoded = await jwt.verify(token, process.env.LOGINTOKEN);
      const user = await userModel.findById(decoded.id);
      req.user = user;
      next();
    }
  };
};
module.exports = { auth };
