require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
const connectDB = require("./DB/connection");
connectDB();
const authRouter = require("./modules/auth/auth.route");
const userRouter = require("./modules/user/user.route");
const messageRouter = require("./modules/message/message.route");
const baseUrl = "/api/v1";
app.use(`${baseUrl}/upload`, express.static("./upload"));
app.use(`${baseUrl}/auth`, authRouter);
app.use(`${baseUrl}/user`, userRouter);
app.use(`${baseUrl}/message`, messageRouter);
app.use("*", (req, res) => {
  res.json({ message: "there is an error from app" });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
