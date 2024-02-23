const express = require("express");
const { postmodel } = require("../model/users");
const { body, validationResult } = require("express-validator");

const router = express.Router();



router.post("/",async (req, res) => {
  try {
    const newUser = await postmodel.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await postmodel.find();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await postmodel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await postmodel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  }catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await postmodel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = router;