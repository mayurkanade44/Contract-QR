const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  frequency: {
    type: String,
    required: [true, "Please select frequency"],
  },
  service: {
    type: [String],
    required: [true, "Please provide service name"],
  },
  serviceDue: [String],
  image: {
    type: String,
  },
  comments: {
    type: String,
  },
  completion: {
    type: String
  },
  contract: {
    type: mongoose.Types.ObjectId,
    ref: "Contract",
    required: true,
  },
});

module.exports = mongoose.model("Service", ServiceSchema);
