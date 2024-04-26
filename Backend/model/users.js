const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { string } = require("joi");

let userSchema = new mongoose.Schema({
  User_Name: String,
  Email: String,
  Password: String,
  unique:String
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.Password, salt);
    this.Password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

let postschema = new mongoose.Schema({
  User_Name: String,
  Excuse: String,
  Comments: Array,
});

const usermodel = mongoose.model("User Detail", userSchema);
const postmodel = mongoose.model("Excuse", postschema);

module.exports = { usermodel, postmodel };
