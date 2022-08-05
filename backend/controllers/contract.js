const Contract = require("../models/contract");
const { BadRequestError } = require("../errors");

const getAllContracts = async (req, res) => {
  const { search, searchSD, searchED } = req.query;
  // const queryObject = {};
  // if (search) {
  //   queryObject.contractNo = { $regex: search, $options: "i" };
  // }
  try {
    let contracts = await Contract.find({}).sort("-createdAt");
    if (search) {
      contracts = await Contract.find({
        $or: [
          { contractNo: { $regex: search, $options: "i" } },
          { type: { $regex: search, $options: "i" } },
          { "shipToAddress.name": { $regex: search, $options: "i" } },
          { "billToAddress.name": { $regex: search, $options: "i" } },
        ],
      }).sort("-createdAt");
    }
    if (searchSD && searchED) {
      contracts = await Contract.find({
        endDate: {
          $gte: new Date(searchSD),
          $lte: new Date(searchED),
        },
      }).sort("-createdAt");
    }

    // const page = Number(req.query.page) || 1;
    // const limit = 5;
    // const skip = (page - 1) * limit;

    contracts = contracts.slice(0, 300);

    res.status(200).json({ contracts, len: contracts.length });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};      

const createContract = async (req, res) => {
  const { contractNo, type } = req.body;
  const contractAlreadyExists = await Contract.findOne({ contractNo });
  if (contractAlreadyExists && type === "NC") {
    throw new BadRequestError("Contract Number Already Exists");
  }

  try {
    const contract = await Contract.create({ ...req.body });
    res.status(201).json({ contract });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

const getContract = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contract.findOne({ _id: id }).populate("services");
    if (!contract) {
      return res.status(400).json({ msg: "no contract found" });
    }

    res.status(200).json({ contract, len: contract.services.length });
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
    res.status(200).json({ contract });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

const deleteContract = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contract.findOne({ _id: id });
    if (!contract) {
      return res.status(400).json({ msg: "no contract found" });
    }
    await contract.remove();
    res.status(200).json({ msg: "Success! Contract removed." });
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
