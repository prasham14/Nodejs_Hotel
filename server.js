const express = require("express");
const app = express();
const db = require("./db");

//  body parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = 3000;

//  routes k lia import
const personRoutes = require("./routes/personroutes");
app.use("/person", personRoutes);
const menuRoutes = require("./routes/menuroutes");
app.use("/menu", menuRoutes);

//  home page
app.get("/", (req, res) => {
  res.send("Welcome to the Hotel");
});

//  activating server
app.listen(PORT, () => {
  console.log("Server started at 3000");
});
