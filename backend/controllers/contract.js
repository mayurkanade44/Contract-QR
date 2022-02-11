const Contract = require("../models/contract");
const QRCode = require("qrcode");

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
    if (!contract) {
      return res.status(400).json({ msg: "no contract found" });
    }
    res.status(200).json({ contract });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

const generateQR = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await Contract.find({ _id: id });
    const stringdata = `Contract Number: ${contract[0].contractNo},

    url: http://localhost:5000/api/contracts/${id}`;

    // QRCode.toDataURL(
    //   `num: ${num},

    //   url: http://localhost:5000/api/contracts/${id}`,
    //   function (err, code) {
    //     if (err) return console.log("error occurred");

    //     // Printing the code
    //     console.log(code);
    //     res.status(200).json(code);
    //   }
    // );

    const generateQR = async (text) => {
      try {
        await QRCode.toFile("./test.png", text);
      } catch (err) {
        console.error(err);
      }
    };
    generateQR(stringdata);
    res.status(200).json({ msg: "success" });
  } catch (error) {
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
  generateQR,
};
