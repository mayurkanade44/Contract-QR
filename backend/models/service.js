const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
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
    },
    business: {
      type: String,
    },
    serviceReport: {
      type: Boolean,
      default: false,
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
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ServiceSchema.virtual("serviceReports", {
  ref: "ServiceReport",
  localField: "_id",
  foreignField: "service",
  justOne: false,
});

module.exports = mongoose.model("Service", ServiceSchema);
