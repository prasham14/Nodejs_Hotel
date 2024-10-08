const express = require("express");
const router = express.Router();
const Person = require("./../models/person");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");
const { findOne } = require("../models/menu");
// router.get("/", (req, res) => {
//   res.send("Hello this is srver end");
// });
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();

    console.log("data saved");
    const payload = {
      id: response.id,
      username: response.username,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token :  ", token);
    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Person.findOne({ username: username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json("Invalid Username or Password");
    }
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);
    res.json({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server Error");
  }
});
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData.id;
    const user = await Person.findById(userId);
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server Error");
  }
});

router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched succesfully");
    res.status(200).json(data);
  } catch (err) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (
      workType === "chef" ||
      workType === "manager" ||
      workType === "waiter"
    ) {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid workType" });
    }
  } catch (err) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personID = req.params.id;
    const updatedPersonData = req.body;
    const isAvailable = await Person.findById(personID);
    console.log(isAvailable);
    if (!isAvailable) {
      return res.status(404).json({
        success: false,
        message: "id is incorrect",
      });
    }
    const response = await Person.findByIdAndUpdate(
      personID,
      updatedPersonData,
      {
        new: true, //returns updated document
        runValidators: true, // for validations in mongoose , it checks the schema in which what is required
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Person not found " });
    }
    console.log("Data Updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const personID = req.params.id;
    const response = await Person.findByIdAndDelete(personID);
    if (!response) {
      return res.status(404).json({ error: "Person not found " });
    }
    console.log("Data Deleted");
    res.status(200).json({ messsage: "Person deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
//  checking git works or not
module.exports = router;
