const express = require("express");
const router = express.Router();
const Person = require("./../models/person");
// router.get("/", (req, res) => {
//   res.send("Hello this is srver end");
// });
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();

    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/", async (req, res) => {
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
module.exports = router;
