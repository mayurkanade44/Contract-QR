const req = require("express/lib/request");
const Contract = require("../models/contract");

const getAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.find({}, { __v: 0 });
    res.status(200).json({ contracts, len: contracts.length });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

const createContract = async (req, res) => {
  try {
    const contract = await Contract.create(req.body);
    res.status(201).json({ contract });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

const getContract = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contract.findOne({ _id: id });
    if (!contract) {
      return res.status(400).json({ msg: "no contract found" });
    }
    res.status(200).json({ contract });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

const updateContract = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contract.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!contract) {
      return res.status(400).json({ msg: "no contract found" });
    }
    res.status(200).json({ contract });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

const deleteContract = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contract.findByIdAndDelete({ _id: id });
    if (!contract) {
      return res.status(400).json({ msg: "no contract found" });
    }
    res.status(200).json({ contract });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

module.exports = {
  getAllContracts,
  createContract,
  getContract,
  deleteContract,
  updateContract,
};
