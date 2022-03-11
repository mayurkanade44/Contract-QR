const Service = require("../models/service");
const Contract = require("../models/contract");
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const sgMail = require("@sendgrid/mail");
const request = require("request");
const newdoc = require("docx-templates");

const getAllService = async (req, res) => {
  try {
    const services = await Service.find({});
    res.status(200).json({ services });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

const createDoc = async (req, res) => {
  const { id } = req.params;
  const isValidContract = await Contract.findOne({ _id: id }).populate(
    "services"
  );
  const {
    contractNo,
    startDate,
    endDate,
    billingFrequency,
    shipToAddress,
    shipToContact1,
    shipToContact2,
    shipToContact3,
    services,
    preferred,
    specialInstruction,
    area,
  } = isValidContract;
  const shipToContact = [];
  shipToContact.push(shipToContact1, shipToContact2, shipToContact3);
  const {
    prefix,
    name,
    address1,
    address2,
    address3,
    address4,
    nearBy,
    city,
    pincode,
  } = shipToAddress;
  const { day, time } = preferred;

  var pre = "";
  if (prefix === "Other") {
    var pre = "";
  } else {
    var pre = prefix;
  }

  try {
    services.forEach(async (element, index) => {
      const z = element._id.toString().replace(/ObjectId\("(.*)"\)/, "$1");
      const tp = await QRCode.toDataURL(
        `http://localhost:5000/api/service/${z}`
      );
      const template = fs.readFileSync(path.resolve(__dirname, "test3.docx"));

      const buffer = await newdoc.createReport({
        cmdDelimiter: ["{", "}"],
        template,

        additionalJsContext: {
          contractNo: contractNo,
          day: day,
          time: time,
          card: index + 1,
          noCards: services.length,
          prefix: pre,
          name: name,
          address1: address1,
          address2: address2,
          address3: address3,
          address4: address4,
          city: city,
          nearBy: nearBy,
          pincode: pincode,
          shipToContact: shipToContact,
          serviceDue: element.serviceDue,
          service: element.service,
          frequency: element.frequency,
          location: element.treatmentLocation,
          area: area,
          billingFrequency: billingFrequency,
          specialInstruction: specialInstruction,
          url: "12",
          qrCode: async (url12) => {
            const dataUrl = tp;
            const data = await dataUrl.slice("data:image/png;base64,".length);
            return { width: 2, height: 2, data, extension: ".png" };
          },
        },
      });

      const contractName = contractNo.replace("/", "");
      fs.writeFileSync(
        path.resolve(__dirname, `${contractName} ${element.frequency} ${index + 1}.docx`),
        buffer
      );
      const result = await cloudinary.uploader.upload(
        `controllers/${contractName} ${element.frequency} ${index + 1}.docx`,
        {
          resource_type: "raw",
          use_filename: true,
          folder: "service-cards",
        }
      );
      const serv = await Service.findByIdAndUpdate(
        { _id: z },
        { card: result.secure_url },
        {
          new: true,
          runValidators: true,
        }
      );
    });

    res.send({ msg: "Documents created successfully" });
  } catch (error) {
    console.log(error);
  }
};

const sendEmail = async (emails, image) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  request.get(image, { encoding: null }, (err, res) => {
    const base64File = Buffer.from(res.body).toString("base64");
    const msg = {
      to: emails,
      from: { email: "exteam.epcorn@gmail.com", name: "EPCORN" },
      subject: "Service completed report card",
      text: "and easy to do anywhere, even with Node.js",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
      attachments: [
        {
          content: base64File,
          filename: "attachment.jpg",
          type: "application/jpg",
          disposition: "attachment",
        },
      ],
    };
    sgMail.send(msg);
  });
};

const generateQr = async (isValidContract, services) => {
  try {
    const serviceId = await services._id;
    const contractNo = isValidContract.contractNo;
    const contractName = contractNo.replace("/", "");
    const name = `${contractName} ${services.frequency} ${services.service}`;

    const stringdata = `Contract Number: ${contractNo},
    url: http://localhost:5000/api/service/${serviceId}`;
    await QRCode.toFile(`./${name}.png`, stringdata);
    // fs.unlinkSync(`./${name}.png`);
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
      // createDoc(isValidContract, services);
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
  console.log(req.body);
  const {
    params: { id: serviceId },
    body: { image, comments, completion },
  } = req;
  try {
    const service = await Service.findByIdAndUpdate(
      { _id: serviceId },
      req.body,
      { new: true, runValidators: true }
    ).populate({
      path: "contract",
      select:
        "billToContact1 billToContact2 billToContact3 shipToContact1 shipToContact2 shipToContact3",
    });

    if (service) {
      const temails = new Set();
      const first = service.contract.billToContact1.email;
      const second = service.contract.shipToContact1.email;
      const fifth = service.contract.billToContact2.email;
      const six = service.contract.billToContact3.email;
      const third = service.contract.shipToContact2.email;
      const fourth = service.contract.shipToContact3.email;
      temails.add(first);
      temails.add(second);
      if (third) {
        temails.add(third);
      }
      if (fourth) {
        temails.add(fourth);
      }
      if (fifth) {
        temails.add(fifth);
      }
      if (six) {
        temails.add(six);
      }
      const emails = [...temails];
      sendEmail(emails, image);
    }
    res.status(200).json({ service });
  } catch (error) {
    console.log(error);
  }
};

const uploadImage = async (req, res) => {
  console.log(req.files);
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
  createDoc,
};
