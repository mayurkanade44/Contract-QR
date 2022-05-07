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
  card: {
    type: String,
  },
  qr: {
    type: String,
  },
  chemicals: [String],
  area: {
    type: String,
    required: [true, "Please provide area"],
  },
  business: {
    type: String,
  },
  treatmentLocation: {
    type: String,
    required: [true, "Please provide treatment location"],
  },
  contract: {
    type: mongoose.Types.ObjectId,
    ref: "Contract",
    required: true,
  },
});

module.exports = mongoose.model("Service", ServiceSchema);
