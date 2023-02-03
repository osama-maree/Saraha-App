const { auth } = require("../../middleware/auth");
const { sendMessage, messageList, deleteMessage } = require("./controller/controller");
const { validation } = require("../../middleware/validation");
const { sendessage } = require("./controller/message.validation");

const router = require("express").Router();
router.post("/:reciverId", validation(sendessage), sendMessage);
router.get("/", auth(), messageList);
router.delete('/delete/:id',auth(),deleteMessage)
module.exports = router;
