const User = require("../models/user");
const { BadRequestError } = require("../errors");

const getAllUsers = async (req, res) => {
  const users = await User.find({}).select('-password');
  res.status(200).json({ users });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new BadRequestError("User Not Found");
  }
  await user.remove();
  res.status(200).json({ msg: "User Has Been Removed." });
};

module.exports = { getAllUsers, deleteUser };
