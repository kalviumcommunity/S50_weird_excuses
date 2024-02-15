const express = require("express");
const router = express.Router();
const { usermodel} = require("../model/users");

router.post("/users", async (req, res) => {
  try {
    const newUser = await usermodel.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const data = await usermodel.find();
    res.json(data);
  } catch (error) {
    console.error("Error while getting the data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await usermodel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await usermodel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await usermodel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
