const express = require("express");
const { usermodel} = require("../model/users");
const { body, validationResult } = require("express-validator");

const router = express.Router();


const validateCreateUser = [
  body("User_ID").isNumeric(),
  body("User_Name").isString(),
  body("Email").isEmail(),
  body("Password").isString(),
  (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      next();
  }
];

const validateUpdateUser = [
  body("User_ID").isNumeric(),
  body("User_Name").isString().notEmpty(),
  body("Email").isString(),
  body("Password").isString().notEmpty(),
  (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      next();
  }
];

router.post("/users",validateCreateUser, async (req, res) => {
  try {
    const newUser = await usermodel.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.get("/users", async (req, res) => {
  try {
    const data = await usermodel.find();
    res.json(data);
  } catch (error) {
    next(error);
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
    next(error);
  }
});

router.put("/users/:id",validateUpdateUser, async (req, res) => {
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
    next(error);
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
    next(error);
  }
});

router.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = router;