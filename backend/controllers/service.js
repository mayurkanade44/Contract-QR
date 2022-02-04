const Service = require("../models/service");
const Contract = require("../models/contract");
const QRCode = require("qrcode");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const sgMail = require("@sendgrid/mail");

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
  const {
    contractNo,
    startDate,
    endDate,
    billingFrequency,
    shipToAddress,
    shipToContact,
  } = isValidContract;
  const { name, address, nearBy, pincode } = shipToAddress[0];
  const { frequency, area, service, specialInstruction, preferred } = services;
  const { day, time } = preferred[0];

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
    contractNo: contractNo,
    day: day,
    time: time,
    name: name,
    address: address,
    nearBy: nearBy,
    pincode: pincode,
    shipToContact: shipToContact,
    service: service,
    frequency: frequency,
    area: area,
    billingFrequency: billingFrequency,
    specialInstruction: specialInstruction,
  });

  const buf = await doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });

  // buf is a nodejs Buffer, you can either write it to a file or res.send it with express for example.
  fs.writeFileSync(path.resolve(__dirname, "output.docx"), buf);
};

const sendEmail = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "sm.agarbati@gmail.com", // Change to your recipient
    from: "exteam.epcorn@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  const info = await sgMail.send(msg);
};

const generateQr = async (isValidContract, services) => {
  try {
    const serviceId = await services._id;
    const contractNo = isValidContract.contractNo;
    const name = `${contractNo}${services.frequency}`;

    const stringdata = `Contract Number: ${contractNo},

    url: http://localhost:5000/api/service/${serviceId}`;
    await QRCode.toFile(`./${name}.png`, stringdata);
  } catch (error) {}
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
      generateQr(isValidContract, services);
      createDoc(isValidContract, services);
    }
    res.status(201).json({ services });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

const singleService = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.find({ _id: id }).populate({
      path: "contract",
      select: "contractNo billToAddress.name",
    });
    res.status(200).json({ service });
  } catch (error) {}
};

const updateCard = async (req, res) => {
  const {
    params: { id: serviceId },
    body: { image, comments },
  } = req;
  try {
    const service = await Service.findByIdAndUpdate(
      { _id: serviceId },
      req.body,
      { new: true, runValidators: true }
    );
    if (service) {
      sendEmail();
    }
    res.status(200).json({ service });
  } catch (error) {
    console.log(error);
  }
};

const uploadImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "contract",
      quality: 50,
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(200).json({ image: result.secure_url });
};

module.exports = {
  getAllService,
  createService,
  updateCard,
  singleService,
  uploadImage,
};
