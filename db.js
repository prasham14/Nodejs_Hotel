const mongoose = require("mongoose");
const mongoURL = "mongodb://127.0.0.1:27017/hotels";
mongoose.connect(mongoURL, {
  // userNewUrlParser: true,
  // useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected to monogDB server");
});
db.on("Error", () => {
  console.log("Connection Error");
});

db.on("disconnected", () => {
  console.log("Server Disconnected");
});

module.exports = db;
