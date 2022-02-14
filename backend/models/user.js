const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt= require('jsonwebtoken')
require("dotenv").config();

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    select:false
  },
  role: {
    type: String,
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
}

module.exports = mongoose.model("User", UserSchema);
