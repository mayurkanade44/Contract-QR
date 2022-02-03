const Service = require("../models/service");
const Contract = require("../models/contract");
const QRCode = require("qrcode");

const getAllService = async (req, res) => {
  try {
    const services = await Service.find({});
    res.status(200).json({ services });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};
const createService = async (req, res) => {
  const { contract: contractId } = req.body;
  const isValidContract = await Contract.findOne({ _id: contractId });
  try {
    if (!isValidContract) {
      return res.status(500).json({ msg: "contract not found" });
    }
    const services = await Service.create(req.body);
    if (services) {
      const serviceId = await services._id;
      const contractNo = isValidContract.contractNo;
      const name = `${contractNo}${services.frequency}`;

      const stringdata = `Contract Number: ${contractNo},

      url: http://localhost:5000/api/contracts/${serviceId}`;
      await QRCode.toFile(`./${name}.png`, stringdata);
    }
    res.status(201).json({ services });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

const generateQr = async (req, res) => {
  try {
    const { id } = req.params;
    const service = Service.find({ _id: id });
    const stringdata = `Contract Number: ${service[0].contractNo},

    url: http://localhost:5000/api/contracts/${id}`;
  } catch (error) {}
};

module.exports = {
  getAllService,
  createService,
};
