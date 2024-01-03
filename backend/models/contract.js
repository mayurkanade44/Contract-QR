const mongoose = require("mongoose");

const ContractSchema = new mongoose.Schema(
  {
    contractNo: {
      type: String,
      required: [true, "Service contract number is required"],
    },
    type: {
      type: String,
    },
    sales: {
      type: String,
    },
    company: { type: String },
    billToAddress: {
      prefix: String,
      name: String,
      address1: String,
      address2: String,
      address3: String,
      address4: String,
      nearBy: String,
      city: String,
      pincode: Number,
    },
    billToContact1: {
      name: String,
      contact: String,
      email: String,
    },
    billToContact2: {
      name: String,
      contact: String,
      email: String,
    },
    billToContact3: {
      name: String,
      contact: String,
      email: String,
    },
    shipToAddress: {
      prefix: String,
      name: String,
      address1: String,
      address2: String,
      address3: String,
      address4: String,
      nearBy: String,
      city: String,
      pincode: Number,
    },
    shipToContact1: {
      name: String,
      contact: String,
      email: String,
    },
    shipToContact2: {
      name: String,
      contact: String,
      email: String,
    },
    shipToContact3: {
      name: String,
      contact: String,
      email: String,
    },
    startDate: {
      type: Date,
      required: [true, "Date is required"],
    },
    endDate: {
      type: Date,
    },
    billingFrequency: {
      type: String,
      required: [true, "Please provide billing frequency"],
    },
    specialInstruction: [String],
    preferred: {
      day: String,
      time: String,
    },
    sendMail: {
      type: Boolean,
      default: false,
    },
    document: [Object],
    branch: { type: String },
    contractCode: { type: String },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ContractSchema.pre("remove", async function () {
  await this.model("Service").deleteMany({ contract: this._id });
});

ContractSchema.virtual("services", {
  ref: "Service",
  localField: "_id",
  foreignField: "contract",
  justOne: false,
});

module.exports = mongoose.model("Contract", ContractSchema);
