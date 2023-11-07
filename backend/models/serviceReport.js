const moongoose = require("mongoose");

const ServiceReportSchema = new moongoose.Schema({
  contract: { type: String },
  serviceName: { type: String },
  comments: { type: String },
  completion: { type: String },
  image: { type: [String] },
  serviceDate: { type: Date },
  efficiency: { type: String },
  work: { type: String },
  behavior: { type: String },
  equipment: { type: String },
  extraServices: { type: String },
  branch: { type: String },
  email: { type: Boolean, default: true },
  service: {
    type: moongoose.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  createdDate: {
    type: Date,
    default: new Date(),
  },
});

module.exports = moongoose.model("ServiceReport", ServiceReportSchema);
