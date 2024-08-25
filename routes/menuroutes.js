const express = require("express");
const router = express.Router();
const menu = require("./../models/menu");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new menu(data);
    const response = await newMenu.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/", async (req, res) => {
  try {
    const data = await menu.find();
    console.log("data fetched succesfully");
    res.status(200).json(data);
  } catch (err) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:menuType", async (req, res) => {
  try {
    const menuType = req.params.menuType;
    if (menuType === "sweet" || menuType === "sour" || menuType === "spicy") {
      const response = await menu.find({ taste: menuType });
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

module.exports = router;
