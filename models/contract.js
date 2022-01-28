const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
  contractNo: {
    type: Number,
    required: [true, "Service contract number is required"],
  },
  service: {
    type: String,
    required: [true, "Service name is required"],
  },
  biilToAddress: [
    {
      address: String,
      nearBy: String,
      pincode: Number,
    },
  ],
  billToContact: [
    {
      name: String,
      contact: Number,
      email: String,
    },
  ],
  shipToAddress: [
    {
      address: String,
      nearBy: String,
      pincode: Number,
    },
  ],
  shipToContact: [
    {
      name: String,
      contact: Number,
      email: String,
    },
  ],
  frequency: {
    type: String,
    enum: {
      values: ["Single", "Weekly", "Monthly", "Quarterly"],
      message: "{VALUE} is not supported",
    },
  },
  area: {
    type: Number,
    required: [true, "Area is required"],
  },
  startDate: {
    type: Date,
    required: [true, "Date is required"],
  },
  endDate: {
    type: Date,
    required: [true, "Date is required"],
  },
  comments: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Contract", contractSchema);
