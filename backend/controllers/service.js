const Service = require("../models/service");
const Contract = require("../models/contract");
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const sgMail = require("@sendgrid/mail");
const request = require("request");
const newdoc = require("docx-templates");
const moment = require("moment");
const pizzip = require("pizzip");
const doctemp = require("docxtemplater");
const ServiceReport = require("../models/serviceReport");
const { Parser } = require("json2csv");

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
    billToAddress,
    billToContact1,
    billToContact2,
    billToContact3,
    shipToContact1,
    shipToContact2,
    shipToContact3,
    services,
    preferred,
    specialInstruction,
    type,
    sales,
    sendMail,
  } = isValidContract;
  const shipToContact = [];
  shipToContact.push(shipToContact1, shipToContact2, shipToContact3);

  const start = moment(startDate).format("MMMM YYYY");
  const end = moment(endDate).format("MMMM YYYY");

  const temails = new Set();
  const first = billToContact1.email;
  const second = shipToContact1.email;
  const fifth = billToContact2.email;
  const six = billToContact3.email;
  const third = shipToContact2.email;
  const fourth = shipToContact3.email;
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

  const allserv = [];
  const allfreq = [];

  services.map((item) => {
    allfreq.push(item.frequency);
    item.service.map((n) => allserv.push(n));
  });

  try {
    services.forEach(async (element, index) => {
      const z = element._id.toString().replace(/ObjectId\("(.*)"\)/, "$1");
      const tp = await QRCode.toDataURL(
        `http://localhost:5000/api/service/${z}`
      );
      let template = fs.readFileSync(path.resolve(__dirname, "test3.docx"));
      const template1 = fs.readFileSync(path.resolve(__dirname, "test2.docx"));
      const chem = element.chemicals;
      const allServices = element.service.map((x, index) => ({
        name: x,
        chemicals: chem[index],
      }));

      if (billToAddress.name.trim() === name.trim()) {
        template = template1;
      }

      const buffer = await newdoc.createReport({
        cmdDelimiter: ["{", "}"],
        template,

        additionalJsContext: {
          contractNo: contractNo,
          type: type,
          sales: sales,
          day: day,
          time: time,
          card: index + 1,
          noCards: services.length,
          billPrefix: billToAddress.prefix,
          billName: billToAddress.name,
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
          service: allServices,
          frequency: element.frequency,
          location: element.treatmentLocation,
          area: element.area,
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

      const contractName = contractNo.replaceAll("/", "");
      const filename = `${contractName} ${element.frequency} ${index + 1}`;
      fs.writeFileSync(
        path.resolve(__dirname, "../files/", `${filename}.docx`),
        buffer
      );
      const result = await cloudinary.uploader.upload(
        `files/${filename}.docx`,
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
      fs.unlinkSync(`./files/${filename}.docx`);
    });
    // if (type === "NC" && !sendMail) {
    //   sendContractEmail(emails, contractNo, allserv, allfreq);
    // }

    // creatCont(id);
    res.status(200).json({ msg: "Cards created successfully" });
  } catch (error) {
    console.log(error);
  }
};

const creatCont = async (id, req, res) => {
  const isValidContract = await Contract.findOne({ _id: id }).populate(
    "services"
  );
  const {
    contractNo,
    startDate,
    endDate,
    billingFrequency,
    shipToAddress,
    billToAddress,
    billToContact1,
    billToContact2,
    billToContact3,
    shipToContact1,
    shipToContact2,
    shipToContact3,
    services,
    preferred,
    specialInstruction,
    type,
    sales,
  } = isValidContract;
  const shipToContact = [];
  shipToContact.push(shipToContact1);
  if (shipToContact2.name || shipToContact2.contact || shipToContact2.email) {
    shipToContact.push(shipToContact2);
  }
  const billToContact = [];
  billToContact.push(billToContact1);
  if (billToContact2.name || billToContact2.contact || billToContact2.email) {
    billToContact.push(billToContact2);
  }
  const { day, time } = preferred;
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
  } = billToAddress;

  const start = moment(startDate).format("MMMM YYYY");
  const end = moment(endDate).format("MMMM YYYY");

  try {
    let template = fs.readFileSync(path.resolve(__dirname, "contract2.docx"));
    const zip = new pizzip(template);

    const doc = new doctemp(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render({
      prefix: prefix,
      name: name,
      address1: address1,
      address2: address2,
      address3: address3,
      address4: address4,
      city: city,
      pincode: pincode,
      nearBy: nearBy,
      contractNo: contractNo,
      start: start,
      end: end,
      sales: sales,
      billingFrequency: billingFrequency,
      shipPrefix: shipToAddress.prefix,
      shipName: shipToAddress.name,
      shipAdd1: shipToAddress.address1,
      shipAdd2: shipToAddress.address2,
      shipAdd3: shipToAddress.address3,
      shipAdd4: shipToAddress.address4,
      shipCity: shipToAddress.city,
      shipPincode: shipToAddress.pincode,
      shipNear: shipToAddress.nearBy,
      day: day,
      time: time,
      services: services,
      shipToContact: shipToContact,
      billToContact: billToContact,
    });

    const buffer = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });
    fs.writeFileSync(path.resolve(__dirname, "output.docx"), buffer);
  } catch (error) {
    console.log(error);
  }
};

const createContrtact = async (id, req, res) => {
  const isValidContract = await Contract.findOne({ _id: id }).populate(
    "services"
  );
  const {
    contractNo,
    startDate,
    endDate,
    billingFrequency,
    shipToAddress,
    billToAddress,
    billToContact1,
    billToContact2,
    billToContact3,
    shipToContact1,
    shipToContact2,
    shipToContact3,
    services,
    preferred,
    specialInstruction,
    type,
    sales,
  } = isValidContract;
  const { day, time } = preferred;
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
  try {
    let template = fs.readFileSync(path.resolve(__dirname, "contract8.docx"));

    const buffer = await newdoc.createReport({
      cmdDelimiter: ["{", "}"],
      template,

      additionalJsContext: {
        prefix: prefix,
        name: name,
        address1: address1,
        address2: address2,
        address3: address3,
        address4: address4,
        city: city,
        pincode: pincode,
        nearBy: nearBy,
        contractNo: contractNo,
        start: start,
        end: end,
        sales: sales,
        biillName: billToContact1.name,
        biillNo: billToContact1.contact,
        biillEmail: billToContact1.email,
        billingFrequency: billingFrequency,
        shipPrefix: shipToAddress.prefix,
        shipName: shipToAddress.name,
        shipAdd1: shipToAddress.address1,
        shipAdd2: shipToAddress.address2,
        shipAdd3: shipToAddress.address3,
        shipAdd4: shipToAddress.address4,
        shipCity: shipToAddress.city,
        shipPincode: shipToAddress.pincode,
        shipNear: shipToAddress.nearBy,
        day: day,
        time: time,
        services: services,
        shipName: shipToContact1.name,
        shipNo: shipToContact1.contact,
        shipEmail: shipToContact1.email,
      },
    });

    const contractName = contractNo.replaceAll("/", "");
    const filename = "test";
    fs.writeFileSync(path.resolve(__dirname, `${filename}.docx`), buffer);
  } catch (error) {
    console.log(error);
  }
};

const sendContractEmail = async (req, res) => {
  const { id } = req.params;
  const isValidContract = await Contract.findOne({ _id: id }).populate(
    "services"
  );

  const {
    contractNo,
    startDate,
    endDate,
    billToContact1,
    billToContact2,
    billToContact3,
    shipToContact1,
    shipToContact2,
    shipToContact3,
    services,
    type,
    sendMail,
  } = isValidContract;

  const temails = new Set();
  const first = billToContact1.email;
  const second = shipToContact1.email;
  const fifth = billToContact2.email;
  const six = billToContact3.email;
  const third = shipToContact2.email;
  const fourth = shipToContact3.email;
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

  const allserv = [];
  const allfreq = [];

  services.map((item) => {
    allfreq.push(item.frequency);
    item.service.map((n) => allserv.push(n));
  });

  const start = moment(startDate).format("MMMM YYYY");
  const end = moment(endDate).format("MMMM YYYY");

  const nc = "d-8db487f4b19147a896ae2ed220f5d1ec";
  const rc = "d-4c0ebd0b403245a98545aaa2c8483202";

  try {
    if (type === "NC" && !sendMail) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const msg = {
        to: emails,
        from: { email: "noreply.epcorn@gmail.com", name: "EPCORN" },
        dynamic_template_data: {
          contractNo: contractNo,
          service: allserv.toString(),
          frequency: allfreq.toString(),
          start: start,
          end: end,
        },
        template_id: "d-8db487f4b19147a896ae2ed220f5d1ec",
      };
      await sgMail.send(msg);

      await Contract.findByIdAndUpdate(
        { _id: id },
        { sendMail: true },
        {
          new: true,
          runValidators: true,
        }
      );
    }
    res.status(200).json({ msg: "Email has been sent" });
  } catch (error) {
    console.log(error);
  }
};

const sendEmail = async (
  emails,
  image,
  contractNo,
  serv,
  completion,
  comments
) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  request.get(image, { encoding: null }, (err, res) => {
    const base64File = Buffer.from(res.body).toString("base64");
    const msg = {
      to: emails,
      cc: "clientproxymail@gmail.com",
      from: { email: "noreply.epcorn@gmail.com", name: "EPCORN" },
      dynamic_template_data: {
        contractNo: contractNo,
        service: serv,
        completion: completion,
        comments: comments,
      },
      template_id: "d-25ffbbb44072488093fa6dcb9bd3978a",
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
    const contractName = contractNo.replaceAll("/", "");
    const name = `${contractName} ${services.frequency} ${services.service.length}`;

    const stringdata = `http://localhost:5000/api/service/${serviceId}`;
    await QRCode.toFile(`./files/${name}.png`, stringdata, { width: 20 });
    const result = await cloudinary.uploader.upload(`files/${name}.png`, {
      width: 80,
      height: 80,
      use_filename: true,
      folder: "service-cards",
    });
    const serv = await Service.findByIdAndUpdate(
      { _id: serviceId },
      { qr: result.secure_url },
      {
        new: true,
        runValidators: true,
      }
    );
    fs.unlinkSync(`./files/${name}.png`);
  } catch (error) {
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
      generateQr(isValidContract, services);
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
    body: { image, comments, completion, serviceDate },
  } = req;
  const date = moment(new Date()).format("DD/MM/YYYY");
  try {
    const service = await Service.findOneAndUpdate(
      { _id: serviceId },
      { serviceReport: true },
      {
        new: true,
        runValidators: true,
      }
    ).populate({
      path: "contract",
      select:
        "billToContact1 billToContact2 billToContact3 shipToContact1 shipToContact2 shipToContact3 contractNo",
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
      const emailSub = service.contract.contractNo;
      const serv = service.service.toString();
      sendEmail(emails, image, emailSub, serv, completion, comments);
    }

    req.body.service = serviceId;
    req.body.serviceDate = moment(serviceDate).format("DD/MM/YYYY");
    const serviceReport = await ServiceReport.create(req.body);
    res.status(200).json({ service });
  } catch (error) {
    console.log(error);
  }
};

const generateReport = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await ServiceReport.find({ service: id });
    const contractNo = data[0].contract.replaceAll("/", "");
    const filename = `Service Report Of ${contractNo}.csv`;
    const fields = [
      { label: "Contract Number", value: "contract" },
      { label: "Service Name", value: "serviceName" },
      { label: "Service Done Date", value: "serviceDate" },
      { label: "Done/Not Done", value: "completion" },
      { label: "Comments By Operator", value: "comments" },
      { label: "Service Card", value: "image" },
    ];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(data);

    fs.writeFileSync(path.resolve(__dirname, "../files/", filename), csv);
    const result = await cloudinary.uploader.upload(`files/${filename}`, {
      resource_type: "raw",
      use_filename: true,
      folder: "service-reports",
    });
    fs.unlinkSync(`./files/${filename}`);
    res.status(200).json({ msg: result.secure_url });
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
      quality: 30,
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(200).json({ image: result.secure_url });
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await Service.findByIdAndDelete({ _id: id });
    res.status(200).json({ msg: "Service card has been deleted" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllService,
  createService,
  updateCard,
  singleService,
  uploadImage,
  createDoc,
  sendContractEmail,
  deleteService,
  generateReport,
};
