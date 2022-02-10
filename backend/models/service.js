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
  preferred: {
    day: String,
    time: String,
  },
  specialInstruction: {
    type: String,
  },
  area: {
    type: Number,
    required: [true, "Please provide area sqft"],
  },
  image: {
    type: String,
  },
  comments: {
    type: String,
  },
  contract: {
    type: mongoose.Types.ObjectId,
    ref: "Contract",
    required: true,
  },
});

module.exports = mongoose.model("Service", ServiceSchema);
