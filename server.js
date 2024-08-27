const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("./auth");
//  body parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// Middleware function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] request made to : ${req.originalUrl}`
  );
  next();
};

app.use(logRequest);
//
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });
//  home page
app.get("/", (req, res) => {
  res.send("Welcome to the Hotel");
});
//
const menuRoutes = require("./routes/menuroutes");
const personRoutes = require("./routes/personroutes");
const { jwtAuthMiddleware } = require("./jwt");
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

//  activating server

app.listen(PORT, () => {
  console.log("Server started at 3000");
});
