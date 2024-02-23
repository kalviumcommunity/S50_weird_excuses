const { usermodel } = require("../config/database");
const bcrypt = require("bcryptjs");


const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new usermodel({
      User_Name: username,
      Email: email,
      Password: password, 
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await usermodel.findOne({ Email: email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.Password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Incorrect password" });
      }
      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports = { createUser,loginUser };