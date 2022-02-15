const User = require("../models/user");
const { BadRequestError, UnAuthenticated } = require("../errors");

const register = async (req, res) => {
  const { name, password, role } = req.body;
  if (!name || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.create({ name, password });
  const token = user.createJWT();
  res
    .status(201)
    .json({ name: user.name, token, msg: "User successfully created." });
};

const login = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    throw new BadRequestError("Please enter all values");
  }

  const user = await User.findOne({ name });
  if (!user) {
    throw new UnAuthenticated("Invalid Name");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticated("Invalid Password");
  }
  const token = await user.createJWT();
  res.status(200).json({ name: user.name, token });
};

module.exports = { register, login };
