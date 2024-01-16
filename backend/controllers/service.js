const Service = require("../models/service");
const Contract = require("../models/contract");
const ServiceReport = require("../models/serviceReport");
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const sgMail = require("@sendgrid/mail");
const newdoc = require("docx-templates");
const moment = require("moment");
const pizzip = require("pizzip");
const doctemp = require("docxtemplater");
const {
  Parser,
  transforms: { unwind },
} = require("json2csv");
const axios = require("axios");
const Admin = require("../models/admin");
const Feedback = require("../models/feedback");
const client = require("@sendgrid/client");
const exceljs = require("exceljs");
var Brevo = require("@getbrevo/brevo");
const mongoose = require("mongoose");

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
    company,
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
      const z = element._id.toString();
      const tp = await QRCode.toDataURL(`https://cqr.sat9.in/feedback/${z}`);
      let template = fs.readFileSync(path.resolve(__dirname, "test3.docx"));
      const template1 = fs.readFileSync(path.resolve(__dirname, "test2.docx"));
      const template2 = fs.readFileSync(path.resolve(__dirname, "test4.docx"));
      const template3 = fs.readFileSync(path.resolve(__dirname, "test5.docx"));
      const chem = element.chemicals;
      const allServices = element.service.map((x, index) => ({
        name: x,
        chemicals: chem[index],
      }));

      if (
        allServices[0].name ===
        "Termiproof - SIP(Installation of Smart Injecting System)"
      ) {
        if (billToAddress.name.trim() === name.trim()) {
          template = template2;
        } else {
          template = template3;
        }
      } else if (billToAddress.name.trim() === name.trim()) {
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

      const contractName = contractNo.replace(/\//g, "-");
      const filename = `${contractName} ${element.frequency} ${
        index + 1
      } ${company}`;
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
    if (type === "NC" && !sendMail) {
      sendContractEmail(emails, contractNo, allserv, allfreq, start, end, id);
    }

    // creatCont(id);
    res.status(200).json({ msg: "Cards created successfully" });
  } catch (error) {
    console.log(error);
  }
};

const sendContractEmail = async (
  emails,
  contractNo,
  allserv,
  allfreq,
  start,
  end,
  id
) => {
  const nc = "d-8db487f4b19147a896ae2ed220f5d1ec";
  const rc = "d-4c0ebd0b403245a98545aaa2c8483202";

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: emails,
      from: { email: "noreply.epcorn@gmail.com", name: "EPCORN" },
      dynamic_template_data: {
        contractNo: contractNo,
        service: allserv.toString(),
        frequency: allfreq.toString(),
        start: start,
        end: start === end ? "Onwards" : end,
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

    const contractName = contractNo.replace(/\//g, "");
    const filename = "test";
    fs.writeFileSync(path.resolve(__dirname, `${filename}.docx`), buffer);
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
  comments,
  serviceDate,
  shipAddress,
  treatmentLocation,
  serviceId
) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const att = [];
    for (let file of image) {
      const response = await axios.get(file, { responseType: "arraybuffer" });
      const base64File = Buffer.from(response.data, "binary").toString(
        "base64"
      );
      const attachObj = {
        content: base64File,
        filename: "attachment.jpg",
        type: "application/jpg",
        disposition: "attachment",
      };
      att.push(attachObj);
    }
    const msg = {
      to: emails,
      from: { email: "noreply.epcorn@gmail.com", name: "EPCORN" },
      dynamic_template_data: {
        contractNo: contractNo,
        shipAddress: shipAddress,
        treatmentLocation: treatmentLocation,
        service: serv,
        completion: completion,
        comments: comments,
        serviceDate: moment(serviceDate).format("DD/MM/YYYY"),
        link: `https://cqr.sat9.in/feedback/${serviceId}`,
      },
      template_id: "d-25ffbbb44072488093fa6dcb9bd3978a",
      attachments: att,
    };
    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const generateQr = async (isValidContract, services) => {
  try {
    const serviceId = await services._id;
    const contractNo = await isValidContract.contractNo;
    const contractName = contractNo.replace(/\//g, "");
    const name = `${contractName} ${services.frequency} ${services.service.length}`;

    const stringdata = `https://cqr.sat9.in/feedback/${serviceId}`;
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
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

const sendBrevoEmail = async ({
  attachment,
  dynamicData,
  emailList,
  templateId,
}) => {
  try {
    let defaultClient = Brevo.ApiClient.instance;
    let apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_KEY;
    let apiInstance = new Brevo.TransactionalEmailsApi();
    let sendSmtpEmail = new Brevo.SendSmtpEmail();

    sendSmtpEmail.sender = {
      name: "EPCORN",
      email: "noreply.epcorn@gmail.com",
    };
    sendSmtpEmail.to = emailList;
    sendSmtpEmail.params = dynamicData;
    sendSmtpEmail.templateId = templateId;
    if (attachment) sendSmtpEmail.attachment = attachment;
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateCard = async (req, res) => {
  const {
    params: { id: serviceId },
    body: { image, comments, completion, serviceDate },
  } = req;

  try {
    const service = await Service.findOne({ _id: serviceId }).populate({
      path: "contract",
      select:
        "billToContact1 billToContact2 billToContact3 shipToContact1 shipToContact2 shipToContact3 contractNo shipToAddress branch",
    });

    if (!service)
      return res.status(404).json({ msg: "Service Card Not Found" });

    service.serviceReport = true;

    await service.save();

    req.body.service = serviceId;
    const branch = service.contract.branch;
    req.body.branch = branch || "MUM - 1";

    if (service) {
      const temails = new Set();
      const first = service.contract.billToContact1.email;
      const second = service.contract.shipToContact1.email;
      const fifth = service.contract.billToContact2.email;
      const six = service.contract.billToContact3.email;
      const third = service.contract.shipToContact2.email;
      const fourth = service.contract.shipToContact3.email;
      if (first && first !== "clientproxymail@gmail.com")
        temails.add({ email: first });
      if (second && second !== "clientproxymail@gmail.com")
        temails.add({ email: second });
      if (third && third !== "clientproxymail@gmail.com")
        temails.add({ email: third });
      if (fourth && fourth !== "clientproxymail@gmail.com")
        temails.add({ email: fourth });
      if (fifth && fifth !== "clientproxymail@gmail.com")
        temails.add({ email: fifth });
      if (six && six !== "clientproxymail@gmail.com")
        temails.add({ email: six });

      const addre = service.contract.shipToAddress;

      const attachment = [];
      image.map((item, index) =>
        attachment.push({ url: item, name: `image-${index + 1}.jpg` })
      );

      const emailList = [];
      [...temails].map(
        (item) =>
          !emailList.some((i) => i.email === item.email) &&
          emailList.push({ email: item.email })
      );

      const dynamicData = {
        service: service.service.toString(),
        completion,
        comments,
        serviceDate: moment(serviceDate).format("DD/MM/YYYY"),
        shipAddress: `${addre.address1}, ${addre.address2}, ${addre.address3}, ${addre.address4}, ${addre.city}`,
        treatmentLocation: service.treatmentLocation,
        emailSub: service.contract.contractNo,
        link: `https://cqr.sat9.in/feedback/${serviceId}`,
      };

      const mail = await sendBrevoEmail({
        dynamicData,
        templateId: 7,
        emailList,
        attachment,
      });
      if (!mail) {
        req.body.email = false;
        await ServiceReport.create({ ...req.body });
        return res.status(400).json({ msg: "Email error" });
      }
      await ServiceReport.create({ ...req.body });
    }

    res.status(200).json({ msg: "Email Sent" });
  } catch (error) {
    res.status(400).json({ msg: "There is some error" });
    console.log(error);
  }
};

const generateReport = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await ServiceReport.find({ service: id });
    const contractNo = data[0].contract.replace(/\//g, "");
    const filename = `Service Report Of ${contractNo}.xlsx`;

    const fields1 = [];
    for (let item of data) {
      if (item.image.length > 0) {
        fields1.push({
          contract: item.contract,
          serviceName: item.serviceName,
          serviceDate: item.serviceDate,
          completion: item.completion,
          email: item.email,
          comments: item.comments,
          image: item.image,
        });
      }
    }

    const workbook = new exceljs.Workbook();
    let worksheet = workbook.addWorksheet("Sheet1");

    worksheet.columns = [
      { header: "Contract Number", key: "contract" },
      { header: "Service Name", key: "serviceName" },
      { header: "Service Done Date", key: "serviceDate" },
      { header: "Done/Not Done", key: "completion" },
      { header: "Email Sent", key: "email" },
      { header: "Comments By Operator", key: "comments" },
      { header: "Image 1", key: "image1" },
      { header: "Image 2", key: "image2" },
    ];

    fields1.map((item) => {
      worksheet.addRow({
        contract: item.contract,
        serviceName: item.serviceName,
        serviceDate: item.serviceDate,
        completion: item.completion,
        email: item.email ? "Yes" : "No",
        comments: item.comments,
        image1:
          (item.image.length >= 1 && {
            text: "Download",
            hyperlink: item.image[0],
          }) ||
          "No Image",
        image2:
          (item.image.length >= 2 && {
            text: "Download",
            hyperlink: item.image[1],
          }) ||
          "No Image",
      });
    });

    const filePath = `./files/${filename}`;
    await workbook.xlsx.writeFile(filePath);
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
  let images = [];

  if (req.files.image.length > 0) {
    images = req.files.image;
  } else {
    images.push(req.files.image);
  }

  const imageLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i].tempFilePath, {
      use_filename: true,
      folder: "contract",
      quality: 30,
    });
    fs.unlinkSync(images[i].tempFilePath);
    imageLinks.push(result.secure_url);
  }
  return res.status(200).json({ image: imageLinks });
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

const editService = async (req, res) => {
  const { id } = req.params;
  try {
    await Service.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ msg: "Card has been updated" });
  } catch (error) {
    console.log(error);
  }
};

const generateBusinessFile = async (req, res) => {
  const { name } = req.params;
  try {
    const data = await Service.find({ business: name }).populate({
      path: "contract",
      select: "contractNo type startDate endDate",
    });
    const filename = `All contract of ${name}.csv`;
    const fields = [
      { label: "Business", value: "business" },
      { label: "Contract Number", value: "contract.contractNo" },
      { label: "Contract Type", value: "contract.type" },
      { label: "Start Date", value: "contract.startDate" },
      { label: "End Date", value: "contract.endDate" },
      { label: "Frequency", value: "frequency" },
      { label: "Service Name", value: "service" },
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

const getAllStats = async (req, res) => {
  try {
    const services = await Service.find();
    const admin = await Admin.find();

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const allJobs = [];
    const year = moment(new Date()).format("YY");
    for (let month of months) {
      const count = services.filter((item) =>
        item.serviceDue.includes(`${month} ${year}`)
      ).length;
      allJobs.push({ x: month, y: count });
    }

    const allService = [];
    const service = admin
      .map((item) => item.serviceChemicals.label)
      .filter((item) => item !== undefined);

    for (let serv of service) {
      const count = services.filter((item) =>
        item.service.includes(serv)
      ).length;
      allService.push({ x: serv, y: count });
    }

    const allBusinessCount = {};
    const business = admin
      .map((item) => item.business)
      .filter((item) => item !== undefined);
    for (let name of business) {
      const count = services.filter((item) => item.business === name).length;
      allBusinessCount[name] = count;
    }
    res.status(200).json({ allJobs, allService, allBusinessCount });
  } catch (error) {
    console.log(error);
  }
};

const serviceNotDoneReport = async (req, res) => {
  const { start, end } = req.query;

  try {
    const serviceDue = moment(start).format("MMM YY");

    const services = await Service.find({ serviceDue })
      .select("frequency service")
      .populate({
        path: "serviceReports",
        match: {
          serviceDate: {
            $gte: new Date(start),
            $lte: new Date(end),
          },
        },
        select: "comments completion",
      })
      .populate({
        path: "contract",
        select: "contractNo",
      });

    const filename = `${serviceDue} Done-Not done job report.csv`;

    const data = [];
    services.forEach((item) =>
      data.push({
        contract: item.contract.contractNo,
        service: item.service,
        frequency: item.frequency,
        serviceReports: item.serviceReports,
      })
    );

    const fields = [
      { label: "Contract Number", value: "contract" },
      { label: "Service Name", value: "service" },
      { label: "Frequency", value: "frequency" },
      {
        label: "Completed/Not Completed",
        value: "serviceReports.completion",
        default: "No data/pending report",
      },
      { label: "Comments", value: "serviceReports.comments" },
    ];

    const transforms = [unwind({ paths: ["serviceReports"] })];
    const json2csvParser = new Parser({ fields, transforms });

    const csv = json2csvParser.parse(data);

    fs.writeFileSync(path.resolve(__dirname, "../files/", filename), csv);
    const result = await cloudinary.uploader.upload(`files/${filename}`, {
      resource_type: "raw",
      use_filename: true,
      folder: "service-reports",
    });
    fs.unlinkSync(`./files/${filename}`);
    res.status(200).json({ link: result.secure_url });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

const dailyReport = async (req, res) => {
  //   try {
  //     const date = new Date();
  //     const new1 = date.setDate(date.getDate() - 5);
  //     console.log(new Date(new1));
  //     const data = await ServiceReport.find({
  //       createdDate: { $gte: new Date(new1) },
  //     });
  //     const filename = "Report.csv";
  //     const allFields = [
  //       [
  //         { label: "Contract Number", value: "contract" },
  //         { label: "Service Name", value: "serviceName" },
  //         { label: "Service Done Date", value: "serviceDate" },
  //         { label: "Created", value: "createdDate" },
  //         { label: "Done/Not Done", value: "completion" },
  //         { label: "Comments By Operator", value: "comments" },
  //         { label: "Service Card", value: "image" },
  //       ],
  //       [
  //         { label: "Contract Number", value: "contract" },
  //         { label: "Service Name", value: "serviceName" },
  //         { label: "Work Efficiency", value: "efficiency" },
  //         { label: "Know His Work", value: "work" },
  //         { label: "His Behavior", value: "behavior" },
  //         { label: "Equipment", value: "equipment" },
  //       ],
  //     ];
  //     const image = [];
  //     for (let fields of allFields) {
  //       const json2csvParser = new Parser({ fields });
  //       const csv = json2csvParser.parse(data);
  //       fs.writeFileSync(path.resolve(__dirname, "../files/", filename), csv);
  //       const result = await cloudinary.uploader.upload(`files/${filename}`, {
  //         resource_type: "raw",
  //         use_filename: true,
  //         folder: "service-reports",
  //       });
  //       fs.unlinkSync(`./files/${filename}`);
  //       image.push(result.secure_url);
  //     }
  //     const files = {
  //       "Service Report.csv": image[0],
  //       "Feedback Report.csv": image[1],
  //     };
  //     const att = [];
  //     for (let file in files) {
  //       const response = await axios.get(files[file], {
  //         responseType: "arraybuffer",
  //       });
  //       const base64File = Buffer.from(response.data, "binary").toString(
  //         "base64"
  //       );
  //       const attachObj = {
  //         content: base64File,
  //         filename: file,
  //         type: "application/json",
  //         disposition: "attachment",
  //       };
  //       att.push(attachObj);
  //     }
  //     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  //     const msg = {
  //       to: "exteam.epcorn@gmail.com",
  //       from: { email: "noreply.epcorn@gmail.com", name: "EPCORN" },
  //       subject: `Scheduled Daily Reports of ${yesterday}`,
  //       html: "<div>Hi Team,<br></br><br></br>and easy to do anywhere, even with Node.js with</div>",
  //       attachments: att,
  //     };
  //     await sgMail.send(msg);
  //     res.status(200).json({ data });
  //   } catch (error) {
  //     console.log(error);
  //   }
};

const serviceIntimation = async (req, res) => {
  const {
    params: { id: serviceId },
    body: { serviceDate },
  } = req;
  try {
    const service = await Service.findOne({ _id: serviceId }).populate({
      path: "contract",
      select:
        "billToContact1 billToContact2 billToContact3 shipToContact1 shipToContact2 shipToContact3 contractNo shipToAddress",
    });

    if (!service)
      return res.status(404).json({ msg: "Service Card Not Found" });

    const temp = new Set();
    if (service.contract.billToContact1.email)
      temp.add(service.contract.billToContact1.email);
    if (service.contract.billToContact2.email)
      temp.add(service.contract.billToContact2.email);
    if (service.contract.billToContact3.email)
      temp.add(service.contract.billToContact3.email);
    if (service.contract.shipToContact1.email)
      temp.add(service.contract.shipToContact1.email);
    if (service.contract.shipToContact2.email)
      temp.add(service.contract.shipToContact2.email);
    if (service.contract.shipToContact3.email)
      temp.add(service.contract.shipToContact3.email);

    if (temp.has("clientproxymail@gmail.com"))
      temp.delete("clientproxymail@gmail.com");

    const emails = [...temp];
    const addre = service.contract.shipToAddress;
    const shipAddress = `${addre.address1}, ${addre.address2}, ${addre.address3}, ${addre.address4}, ${addre.city}`;
    const contractNo = service.contract.contractNo;
    const serv = service.service.toString();
    const link = `https://cqr.sat9.in/feedback/${serviceId}`;

    if (emails.length > 0) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const msg = {
        to: emails,
        cc: process.env.EPCORN_EMAIL,
        from: { email: "noreply.epcorn@gmail.com", name: "Epcorn" },
        dynamic_template_data: {
          service: serv,
          contractNo,
          shipAddress,
          link,
        },
        template_id: "d-8deb06e9be554fb682ddf1f2670c36d8",
      };
      await sgMail.send(msg);
    }

    return res.json({ msg: "Mail has been sent" });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

const branchReport = async (branch, searchED, searchSD) => {
  const query = { branch };

  if (searchED && searchSD) {
    query.serviceDate = {
      $gte: new Date(searchSD),
      $lte: new Date(searchED),
    };
  }
  try {
    const reports = await ServiceReport.find(query);
    if (!reports) return false;

    if (reports.length) {
      const workbook = new exceljs.Workbook();
      let worksheet = workbook.addWorksheet("Sheet1");

      worksheet.columns = [
        { header: "Contract Number", key: "contractNo" },
        { header: "Service Name", key: "serviceName" },
        { header: "Service Status", key: "serviceStatus" },
        { header: "Service Date", key: "serviceDate" },
        { header: "Operator Comment", key: "serviceComment" },
        { header: "Image 1", key: "image1" },
        { header: "Image 2", key: "image2" },
      ];

      reports.map((item) => {
        worksheet.addRow({
          contractNo: item.contract,
          serviceName: item.serviceName,
          serviceStatus: item.completion,
          serviceDate: item.serviceDate,
          serviceComment: item.comments,
          image1:
            (item.image.length >= 1 && {
              text: "Download",
              hyperlink: item.image[0],
            }) ||
            "No Image",
          image2:
            (item.image.length >= 2 && {
              text: "Download",
              hyperlink: item.image[1],
            }) ||
            "No Image",
        });
      });

      const filePath = `./tmp/${branch} Service Report.xlsx`;
      await workbook.xlsx.writeFile(filePath);

      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: "raw",
        use_filename: true,
        folder: "service-reports",
      });

      fs.unlinkSync(filePath);
      return result.secure_url;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getBranchReport = async (req, res) => {
  const { branch, searchSD, searchED } = req.body;
  try {
    if (!branch) return res.status(400).json({ msg: "Please select branch" });

    const reportLink = await branchReport(branch, searchED, searchSD);

    if (!reportLink)
      return res.status(400).json({ msg: "No service report found" });

    return res.status(200).json({ reportLink, msg: "Report generated" });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getDayReports = async (today, yesterday) => {
  try {
    const reports = await ServiceReport.find({
      createdDate: {
        $gte: new Date(yesterday),
        $lte: new Date(today),
      },
    });

    if (reports.length > 0) {
      const workbook = new exceljs.Workbook();
      let worksheet = workbook.addWorksheet("Sheet1");

      worksheet.columns = [
        { header: "Contract Number", key: "contractNo" },
        { header: "Branch", key: "branch" },
        { header: "Service Name", key: "serviceName" },
        { header: "Service Status", key: "serviceStatus" },
        { header: "Service Date", key: "serviceDate" },
        { header: "Operator Comment", key: "serviceComment" },
        { header: "Image 1", key: "image1" },
        { header: "Image 2", key: "image2" },
      ];

      reports.map((item) => {
        worksheet.addRow({
          contractNo: item.contract,
          branch: item.branch,
          serviceName: item.serviceName,
          serviceStatus: item.completion,
          serviceDate: item.serviceDate,
          serviceComment: item.comments,
          image1:
            (item.image.length >= 1 && {
              text: "Download",
              hyperlink: item.image[0],
            }) ||
            "No Image",
          image2:
            (item.image.length >= 2 && {
              text: "Download",
              hyperlink: item.image[1],
            }) ||
            "No Image",
        });
      });

      const filePath = `./tmp/Daily Service Report.xlsx`;
      await workbook.xlsx.writeFile(filePath);

      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: "raw",
        use_filename: true,
        folder: "service-reports",
      });

      fs.unlinkSync(filePath);
      return { link: result.secure_url, count: reports.length };
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const autoBranchReport = async (req, res) => {
  try {
    const date = new Date();
    const yesterday = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - 1
    ).setHours(5, 30, 0);

    const branches = ["MUM - 1", "PUN - 1", "BLR - 1", "All"];
    const links = [];

    let dailyReportCount = 0;
    for (let branch of branches) {
      if (branch === "All") {
        const dailyReport = await getDayReports(date, yesterday);
        if (dailyReport) {
          links.push({
            url: dailyReport.link,
            name: "Daily Scanned QR Cards.xlsx",
          });
          dailyReportCount = dailyReport.count;
        }
      } else {
        const reportLink = await branchReport(branch, yesterday, yesterday);
        if (reportLink) links.push({ url: reportLink, name: `${branch}.xlsx` });
      }
    }

    let defaultClient = Brevo.ApiClient.instance;
    let apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_KEY;
    let apiInstance = new Brevo.TransactionalEmailsApi();
    let sendSmtpEmail = new Brevo.SendSmtpEmail();

    sendSmtpEmail.subject = `Auto Generated Branch Reports Of ${moment(
      yesterday
    ).format("DD/MM/YYYY")}`;
    sendSmtpEmail.htmlContent = `<html><body><div>Hi Team,<br><br>Please find the attachments of yesterday's branch wise service done/not done report.<br>Today ${dailyReportCount} cards scanned & attached report file.<br><br>Thanks & Regards<br>Epcorn Team</div></body></html>`;
    sendSmtpEmail.sender = { name: "EPCORN", email: process.env.EXTEAM_EMAIL };
    sendSmtpEmail.to = [
      { email: process.env.STQ_EMAIL },
      { email: process.env.EPCORN_EMAIL },
    ];
    sendSmtpEmail.attachment = links;

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    return res.status(200).json({ msg: "Mail Send" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ msg: "Mail Error" });
  }
};

const monthlyBranchServiceDue = async (req, res) => {
  const { id } = req.params;

  let date = moment();
  if (id === "next") date = moment().add(1, "month");
  if (id === "previous") date = moment().subtract(1, "month");

  try {
    const monthName = moment(date).format("MMM YY");
    const branches = ["BLR - 1", "MUM - 1", "PUN - 1"];
    const fileLinks = [];

    for (let branch of branches) {
      const services = await Contract.find({ branch }).populate({
        path: "services",
        match: { serviceDue: { $in: monthName } },
      });

      const ser = [];
      for (let service of services) {
        if (service.services.length > 0) {
          for (let serv of service.services) {
            ser.push({
              id: serv._id,
              contractNo: service.contractNo,
              name: service.shipToAddress.name,
              address: `${service.shipToAddress.address1}, ${service.shipToAddress.address2}, ${service.shipToAddress.address3}, ${service.shipToAddress.address4}, ${service.shipToAddress.nearBy}, ${service.shipToAddress.pincode}`,
              frequency: serv.frequency,
              service: serv.service.join(", "),
              period: `${moment(service.startDate).format("MMM-YY")} - ${moment(
                service.endDate
              ).format("MMM-YY")}`,
            });
          }
        }
      }

      const reports = await ServiceReport.find({
        serviceDate: {
          $gte: moment(date).startOf("month"),
          $lte: id === "previous" ? moment(date).endOf("month") : date,
        },
      }).select("service serviceDate image");

      const allData = [];
      for (let s of ser) {
        let date = "";
        let image = "";
        for (let r of reports) {
          if (r.service.toString() == s.id.toString()) {
            date += `${moment(r.serviceDate).format("DD/MM/YY")}, `;
            image = r.image[0];
          }
        }
        allData.push({
          contractNo: s.contractNo,
          period: s.period,
          name: s.name,
          address: s.address,
          service: s.service,
          frequency: s.frequency,
          serviceDates: date,
          image: image,
        });
      }

      if (allData.length > 0) {
        const workbook = new exceljs.Workbook();
        let worksheet = workbook.addWorksheet("Sheet1");

        worksheet.columns = [
          { header: "Contract Number", key: "contractNo" },
          { header: "Contract Period", key: "period" },
          { header: "Client Name", key: "name" },
          { header: "Client Address", key: "address" },
          { header: "Service Name", key: "service" },
          { header: "Service Frequency", key: "frequency" },
          { header: "Service Card", key: "image" },
          { header: "Service Dates", key: "dates" },
        ];

        allData.map((item) => {
          worksheet.addRow({
            contractNo: item.contractNo,
            period: item.period,
            name: item.name,
            address: item.address,
            service: item.service,
            frequency: item.frequency,
            image: item.image.length
              ? {
                  text: "Download",
                  hyperlink: item.image,
                }
              : "NA",
            dates: item.serviceDates,
          });
        });

        let fileName = `${branch} Service Report Of ${monthName}.xlsx`;
        if (id === "next") `${branch} Service Due Of ${monthName}.xlsx`;
        const filePath = `./tmp/${fileName}`;

        await workbook.xlsx.writeFile(filePath);

        const result = await cloudinary.uploader.upload(filePath, {
          resource_type: "raw",
          use_filename: true,
          folder: "service-reports",
        });

        fileLinks.push({
          url: result.secure_url,
          name: fileName,
        });

        fs.unlinkSync(filePath);
      }
    }

    if (fileLinks.length > 0) {
      let defaultClient = Brevo.ApiClient.instance;
      let apiKey = defaultClient.authentications["api-key"];
      apiKey.apiKey = process.env.BREVO_KEY;
      let apiInstance = new Brevo.TransactionalEmailsApi();
      let sendSmtpEmail = new Brevo.SendSmtpEmail();

      let subject = "All Branches Service Report";
      if (id === "next") subject = "All Branches Service Due";

      sendSmtpEmail.subject = `${subject} Of ${monthName}`;
      sendSmtpEmail.htmlContent = `<html><body><div>Hi Team,<br><br>Please find the attachments of ${subject} of ${monthName}.<br><br>Thanks & Regards<br>Epcorn Team</div></body></html>`;
      sendSmtpEmail.sender = {
        name: "EPCORN",
        email: process.env.EXTEAM_EMAIL,
      };
      sendSmtpEmail.to = [
        { email: process.env.NATCO_EMAIL },
        { email: process.env.STQ_EMAIL },
        { email: process.env.EPCORN_EMAIL },
        { email: process.env.SALES_EMAIL },
      ];
      sendSmtpEmail.attachment = fileLinks;

      await apiInstance.sendTransacEmail(sendSmtpEmail);
    }

    res.json({ msg: "Report Generated" });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

const contractCodeReport = async (req, res) => {
  try {
    let date = moment();
    const monthName = moment(date).format("MMM YY");
    const fileLinks = [];
    const allCodes = [];
    const codes = await Admin.find();
    codes.map(
      (item) =>
        item.contractCode !== undefined && allCodes.push(item.contractCode)
    );

    for (let contractCode of allCodes) {
      const services = await Contract.find({ contractCode }).populate({
        path: "services",
        match: { serviceDue: { $in: monthName } },
      });

      const ser = [];
      for (let service of services) {
        if (service.services.length > 0) {
          for (let serv of service.services) {
            ser.push({
              id: serv._id,
              contractNo: service.contractNo,
              branch: service.branch,
              name: service.shipToAddress.name,
              address: `${service.shipToAddress.address1}, ${service.shipToAddress.address2}, ${service.shipToAddress.address3}, ${service.shipToAddress.address4}, ${service.shipToAddress.nearBy}, ${service.shipToAddress.pincode}`,
              frequency: serv.frequency,
              service: serv.service.join(", "),
            });
          }
        }
      }

      const reports = await ServiceReport.find({
        serviceDate: {
          $gte: moment(date).startOf("month"),
          $lte: date,
        },
      }).select("service serviceDate image");

      const allData = [];
      for (let s of ser) {
        let date = "";
        let image = "";
        for (let r of reports) {
          if (r.service.toString() == s.id.toString()) {
            date += `${moment(r.serviceDate).format("DD/MM/YY")}, `;
            image = r.image[0];
          }
        }
        allData.push({
          contractNo: s.contractNo,
          branch: s.branch,
          name: s.name,
          address: s.address,
          service: s.service,
          frequency: s.frequency,
          serviceDates: date,
          image: image,
        });
      }

      if (allData.length > 0) {
        const workbook = new exceljs.Workbook();
        let worksheet = workbook.addWorksheet("Sheet1");

        worksheet.columns = [
          { header: "Contract Number", key: "contractNo" },
          { header: "Branch", key: "branch" },
          { header: "Client Name", key: "name" },
          { header: "Client Address", key: "address" },
          { header: "Service Name", key: "service" },
          { header: "Service Frequency", key: "frequency" },
          { header: "Service Card", key: "image" },
          { header: "Service Dates", key: "dates" },
        ];

        allData.map((item) => {
          worksheet.addRow({
            contractNo: item.contractNo,
            branch: item.branch,
            name: item.name,
            address: item.address,
            service: item.service,
            frequency: item.frequency,
            image: item.image.length
              ? {
                  text: "Download",
                  hyperlink: item.image,
                }
              : "NA",
            dates: item.serviceDates,
          });
        });

        let fileName = `${monthName} Service Report Of ${contractCode}.xlsx`;
        // if (id === "next") `${monthName} Service Due Of ${contractCode}.xlsx`;
        const filePath = `./tmp/${fileName}`;

        await workbook.xlsx.writeFile(filePath);

        const result = await cloudinary.uploader.upload(filePath, {
          resource_type: "raw",
          use_filename: true,
          folder: "service-reports",
        });

        fileLinks.push({
          url: result.secure_url,
          name: fileName,
        });

        fs.unlinkSync(filePath);
      }
    }

    if (fileLinks.length > 0) {
      let defaultClient = Brevo.ApiClient.instance;
      let apiKey = defaultClient.authentications["api-key"];
      apiKey.apiKey = process.env.BREVO_KEY;
      let apiInstance = new Brevo.TransactionalEmailsApi();
      let sendSmtpEmail = new Brevo.SendSmtpEmail();

      let subject = "Contract Codes Service Report";
      // if (id === "next") subject = "All Branches Service Due";

      sendSmtpEmail.subject = `Auto Generated ${subject} Of ${monthName}`;
      sendSmtpEmail.htmlContent = `<html><body><div>Hi Team,<br><br>Please find the attachments of all ${subject} of ${monthName}.<br><br>Thanks & Regards<br>Epcorn Team</div></body></html>`;
      sendSmtpEmail.sender = {
        name: "EPCORN",
        email: process.env.EXTEAM_EMAIL,
      };
      sendSmtpEmail.to = [
        { email: process.env.NATCO_EMAIL },
        { email: process.env.STQ_EMAIL },
        { email: process.env.SALES_EMAIL },
      ];
      sendSmtpEmail.attachment = fileLinks;

      await apiInstance.sendTransacEmail(sendSmtpEmail);
    }
    return res.json({ msg: "Contract code reports generated" });
  } catch (error) {
    res.status(500).json({ msg: error });
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
  generateBusinessFile,
  getAllStats,
  dailyReport,
  serviceNotDoneReport,
  editService,
  serviceIntimation,
  getBranchReport,
  autoBranchReport,
  getDayReports,
  monthlyBranchServiceDue,
  contractCodeReport,
};
