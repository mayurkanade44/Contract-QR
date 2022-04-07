const Admin = require("../models/admin");

const addValues = async (req, res) => {
  const { addComment } = req.body;
  const comment = await Admin.create(req.body);
  res.status(201).json({ msg: "Added successfully" });
};

const allValues = async (req, res) => {
  const allValues = await Admin.find({});
  res.status(200).json({ allValues });
};

module.exports = { addValues, allValues };


