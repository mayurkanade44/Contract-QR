const moongoose = require("mongoose");

const ServiceReportSchema = new moongoose.Schema({
  contract: {
    type: String,
  },
  serviceName: {
    type: String,
  },
  comments: {
    type: String,
  },
  completion: {
    type: String,
  },
  image: {
    type: [String],
  },
  service: {
    type: moongoose.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  serviceDate: {
    type: String,
  },
  feedbackDate: { type: String },
  efficiency: { type: String },
  work: { type: String },
  behavior: { type: String },
  equipment: { type: String },
  extraServices: { type: String },
});

module.exports = moongoose.model("ServiceReport", ServiceReportSchema);
