const express = require("express");
const { usermodel } = require("../model/users");
const bcrypt = require("bcryptjs");
const userSchema = require("../model/uservalidation");
const jwt = require("jsonwebtoken")
const Cookies=require("js-cookie");
const { cookie } = require("express-validator");


function generateRandomId(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const router = express.Router();


router.post("/", async (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { User_Name, Email, Password } = req.body;

    const hashedPassword = await bcrypt.hash(Password, 10);

    const unique = generateRandomId(24);

    const token = jwt.sign({ unique ,User_Name,Email }, "alwaysbeasmuchweirdaspossible", { expiresIn: "1h" });


    const newUser = await usermodel.create({
      User_Name,
      Email,
      Password: hashedPassword,
    });

    res.status(201).json({token} );
  } catch (error) {
    next(error);
  }
});


router.get("/", async (req, res) => {
  try {
    const data = await usermodel.find();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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
