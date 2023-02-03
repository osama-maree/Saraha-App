const jwt = require("jsonwebtoken");
const { userModel } = require("../DB/model/user.model");
const auth = () => {
  return async (req, res, next) => {
    let { token } = req.headers;//The user must be logged in , i take token from header from front end
    if (!token.startsWith(process.env.authBearerToken)) {//for bearer token to increase secure
      res.json({ message: "error token" });//If not logged in,reject request
    } else {
      token = token.split("__")[1];//cut bearer token
      const decoded = await jwt.verify(token, process.env.LOGINTOKEN);
      const user = await userModel.findById(decoded.id);
      req.user = user;//put information for user inside req to use anther place
      next();//go to next operation
    }
  };
};
module.exports = { auth };
