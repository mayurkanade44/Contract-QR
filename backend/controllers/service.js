const Service = require("../models/service");
const Contract = require("../models/contract");
const QRCode = require("qrcode");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");

const getAllService = async (req, res) => {
  try {
    const services = await Service.find({});
    res.status(200).json({ services });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

const createDoc = async (isValidContract, services) => {
  const { contractNo, startDate, endDate, billingFrequency, shipToAddress } =
    isValidContract;
  const { name, address, nearBy, pincode } = shipToAddress[0];
  const {frequency, area, service, specialInstruction, preferred} = services
  const { day, time } = preferred[0]
  const content = fs.readFileSync(
    path.resolve(__dirname, "test.docx"),
    "binary"
  );

  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.render({
    contractNo: 123,
    service: "GS",
  });

  const buf = await doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
  });

  // buf is a nodejs Buffer, you can either write it to a file or res.send it with express for example.
  fs.writeFileSync(path.resolve(__dirname, "output.docx"), buf);
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
      console.log(services.preferred);

      const stringdata = `Contract Number: ${contractNo},

      url: http://localhost:5000/api/contracts/${serviceId}`;
      await QRCode.toFile(`./${name}.png`, stringdata);
      // createDoc();
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
