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
});

module.exports = moongoose.model("ServiceReport", ServiceReportSchema);
