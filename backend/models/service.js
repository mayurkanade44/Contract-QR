const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  frequency: {
    type: String,
    required: [true, "Please select frequency"],
    enum: [
      "Daily",
      "Thrice A Week",
      "Twice A Week",
      "Weekly",
      "Thrice A Month",
      "Fortnightly",
      "Monthly",
      "Quarterly",
      "Thrice A Year",
      "Twice A Year",
      "Yearly",
    ],
  },
  service: {
    type: [String],
    required: [true, "Please provide service name"],
  },
  preferred: [
    {
      day: String,
      time: String,
    },
  ],
  specialInstruction: {
    type: String,
  },
  area: {
    type: Number,
    required: [true, "Please provide area sqft"],
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
