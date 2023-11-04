const Contract = require("../models/contract");
const { BadRequestError } = require("../errors");
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { Parser } = require("json2csv");
const moment = require("moment");

const getAllContracts = async (req, res) => {
  const { search, searchSD, searchED } = req.query;

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
    let renewalLink;
    if (searchSD && searchED) {
      contracts = await Contract.find({
        endDate: {
          $gte: new Date(searchSD),
          $lte: new Date(searchED),
        },
      }).sort("-createdAt");
      renewalLink = await generateRenewalFile(contracts);
    }

    contracts = contracts.slice(0, 100);

    res.status(200).json({ contracts, len: contracts.length, renewalLink });
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

const generateRenewalFile = async (contracts) => {
  const month = moment(contracts.endDate).format("MMMM YYYY");
  const fileName = `Renewal report of ${month}.csv`;

  const fields = [
    { label: "Contract Number", value: "contractNo" },
    { label: "Contractee Name", value: "billToAddress.name" },
    { label: "Sales Associate", value: "sales" },
  ];

  const json2csvParser = new Parser({ fields });
  const csv = json2csvParser.parse(contracts);

  fs.writeFileSync(path.resolve(__dirname, "../files/", fileName), csv);
  const result = await cloudinary.uploader.upload(`files/${fileName}`, {
    resource_type: "raw",
    use_filename: true,
    folder: "service-reports",
  });
  fs.unlinkSync(`./files/${fileName}`);
  return result.secure_url;
};

const fileUpload = async (req, res) => {
  const { id } = req.params;
  const { date, fileName, description } = req.body;
  try {
    if (!req.files) {
      return res.status(400).json({ msg: "No file found" });
    }

    const docFile = req.files.doc;
    const docPath = path.join(__dirname, "../files/" + `${docFile.name}`);
    await docFile.mv(docPath);

    const result = await cloudinary.uploader.upload(`files/${docFile.name}`, {
      resource_type: "raw",
      use_filename: true,
      folder: "mcd",
    });

    const contact = await Contract.findOne({ _id: id });

    contact.document.push({
      date: date,
      fileName: fileName,
      description: description,
      file: result.secure_url,
    });

    await contact.save();

    fs.unlinkSync(`./files/${docFile.name}`);
    return res.status(200).json({ msg: "File has been uploaded" });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

const deleteFile = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contract.findOne({ _id: id });
    contact.document = req.body;

    await contact.save();
    return res.status(200).json({ msg: "File has been deleted" });
  } catch (error) {
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
  fileUpload,
  deleteFile,
};
