const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    reciverid: {//foreign key refference on userModel to know who this messege
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);
const messageModel = mongoose.model("message", messageSchema);
module.exports = { messageModel };
