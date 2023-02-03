const { userModel } = require("../../../DB/model/user.model");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../../../services/email");
const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await userModel.findById(req.user._id);

    const match = await bcrypt.compare(oldPassword, user.password);

    if (!match) {
      res.json({ message: "old password invalid" });
    } else {
      const hashed = await bcrypt.hash(
        newPassword,
        parseInt(process.env.saltRound)
      );
      const pp = await userModel.findByIdAndUpdate(req.user._id, {
        password: hashed,
      });
      if (pp) {
        res.json({ message: "success updated ", userIs: pp });
      } else {
        res.json({ message: "failed", error: pp });
      }
    }
  } catch (err) {
    res.json({ message: "error" });
  }
};

const allUser = async (req, res) => {
  const { name } = req.body;
  const user = await userModel.findOne({ userName: name });
  res.status(200).json(user);
};

const uploadPic = async (req, res) => {
  if (!req.file) {
    res.status(400).json({ message: "please inter U message" });
  } else {
    const image = req.file.destination + "/" + req.file.filename;
    const updatedImage = await userModel.findOneAndUpdate(
      { _id: req.user._id },
      { profilePic: image }
    );
    res.status(200).json({ message: "success", user: updatedImage });
  }
};

module.exports = {
  updatePassword,
  allUser,
  uploadPic,
};
