const User = require("../models/user");
const {BadRequestError} = require('../errors')

const register = async (req, res) => {
  const { name, password, role } = req.body;
  if (!name || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.create({ name, password });
  res.status(201).json({ user, msg: "User successfully created" });
};

const login = (req, res) => {
  res.send("login user");
};

module.exports = { register, login };
