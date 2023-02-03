const mongoose = require("mongoose");//use mongoose
mongoose.set("strictQuery", true);//reject all text in console page
const connectDB = async () => {
  return await mongoose
    .connect("mongodb://localhost:27017/saraha")//create connection with database
    .then((res) => {
      console.log("connection DB");
    })
    .catch((err) => {
      console.log("error from database");
    });
};

module.exports = connectDB;
