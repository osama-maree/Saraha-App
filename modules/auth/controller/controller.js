const { userModel } = require("../../../DB/model/user.model");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../../../services/email");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    res.status(409).json({ message: "user exits" });
  } else {
    let hashpassword = await bcrypt.hash(
      password,
      parseInt(process.env.saltRound)
    );

    const newUser = new userModel({
      userName: name,
      email: email,
      password: hashpassword,
    });
    const Saveduser = await newUser.save();
    if (!Saveduser) res.json({ messgae: "fail to singup" });
    else {
      const token = await jwt.sign({ id: Saveduser._id }, process.env.EMAIL, {
        expiresIn: "1h",
      });
      const refreshtoken = await jwt.sign(
        { id: Saveduser._id },
        process.env.EMAIL
      );
      let messageref = `
      <a href="${req.protocol}://${req.headers.host}/api/v1/auth/reftoken/${refreshtoken}">refresh Token email</a>`;
      let message = `
      <a href="${req.protocol}://${req.headers.host}/api/v1/auth/confirmEmail/${token}">verfy email</a>`;
      await sendEmail(email, "confirm email", `${message}<br/>${messageref}`);
      res.status(201).json({ message: "added user", Saveduser });
    }
  }
};
const refreshToken = async (req, res) => {
  const { token } = req.params;
  const decoded = jwt.verify(token, process.env.EMAIL);
  if (!decoded?.id) {
    res.status(404).json({ message: "invalid email" });
  } else {
    const user = await userModel.findById(decoded.id).select("email");
    if (!user) res.status(404).json({ message: "not register" });
    else {
      const token = jwt.sign({ id: user.id }, process.env.EMAIL, {
        expiresIn: 60 * 5,
      });
      let message = `
      <a href="${req.protocol}://${req.headers.host}/api/v1/auth/confirmEmail/${token}">verfy email</a>`;
      await sendEmail(user.email, "confirmEmail", message);
      res.status(200).json({ message: "success" });
    }
  }
};
const confirmEmail = async (req, res) => {
  const { token } = req.params;
  const decode = await jwt.verify(token, process.env.EMAIL);
  if (!decode) {
    res.json({ message: "invalid token" });
  }
  await userModel.findByIdAndUpdate(
    { _id: decode.id, confirmEmail: false },
    {
      confirmEmail: true,
    }
  );
  res.json(decode);
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    res.json({ message: "invalid account" });
  } else {
    if (user.confirmEmail == false) {
      res.json({ message: "please vefy U email" });
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.json({ message: "invalid account" });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.LOGINTOKEN, {
          expiresIn: 60 * 60 * 24,
        });
        res.json({ message: "valid account", token });
      }
    }
  }
};
const sendCode = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email }).select("email");
  if (!user) {
    res.json({ message: "invalid account" });
  } else {
    const code = nanoid();
    await sendEmail(email, "Forget password", `verify code : ${code}`);
    const updateUser = await userModel.findOneAndUpdate(
      { email },
      { sendCode: code }
    );
    if (updateUser) {
      res.json({ message: "success" });
    } else {
      res.json({ message: "invalid update" });
    }
  }
};

const ForgetPassword = async (req, res) => {
  const { code, email, newPassword } = req.body;
  if (!code) {
    res.json({ message: "enter code" });
  } else {
    const hash = await bcrypt.hash(
      newPassword,
      parseInt(process.env.saltRound)
    );
    const user = await userModel.findOneAndUpdate(
      { email: email, sendCode: code },
      { password: hash }
    );
    if (user) {
      res.json({ message: "success" });
    } else {
      res.json({ messgae: "error code" });
    }
  }
};

module.exports = {
  refreshToken,
  ForgetPassword,
  sendCode,
  signIn,
  signup,
  confirmEmail,
};
