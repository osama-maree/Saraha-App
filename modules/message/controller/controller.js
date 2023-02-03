const { messageModel } = require("../../../DB/model/message.model");
const { userModel } = require("../../../DB/model/user.model");

const sendMessage = async (req, res) => {
  const { reciverId } = req.params;
  const { message } = req.body;

  const user = await userModel.findById(reciverId);
  if (!user) {
    res.json({ message: "reciever not found" });
  } else {
    const newMessage = new messageModel({
      text: message,
      reciverid: reciverId,
    });
    const savedMessage = await newMessage.save();
    res.json({ message: "success", message: savedMessage });
  }
};

const messageList = async (req, res) => {
  const message = await messageModel.find({
    reciverid: req.user._id,
  });
  res.json(message);
};

const deleteMessage = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const deleted = await messageModel.findOneAndDelete({
    _id: id,
    reciverid: userId,
  });
  if (!deleted) res.json({ message: "invalid delte message" });
  else res.json({ message: "success" });
};
module.exports = {
  sendMessage,
  messageList,
  deleteMessage,
};
