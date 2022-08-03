const moongoose = require("mongoose");
const moment = require("moment");

const ServiceReportSchema = new moongoose.Schema({
  contract: { type: String },
  serviceName: { type: String },
  comments: { type: String },
  completion: { type: String },
  image: { type: [String] },
  serviceDate: { type: String },
  efficiency: { type: String },
  work: { type: String },
  behavior: { type: String },
  equipment: { type: String },
  extraServices: { type: String },
  service: {
    type: moongoose.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  createdDate: {
    type: String,
    default: moment(new Date()).format("DD/MM/YYYY"),
  },
});

module.exports = moongoose.model("ServiceReport", ServiceReportSchema);
