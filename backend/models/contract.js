const mongoose = require("mongoose");

const ContractSchema = new mongoose.Schema(
  {
    contractNo: {
      type: String,
      required: [true, "Service contract number is required"],
    },
    billToAddress: {
      name: String,
      address1: String,
      address2: String,
      address3: String,
      address4: String,
      nearBy: String,
      city: String,
      pincode: Number,
    },

    billToContact: [
      {
        name: String,
        contact: Number,
        email: String,
      },
    ],
    shipToAddress: {
      name: String,
      address1: String,
      address2: String,
      address3: String,
      address4: String,
      nearBy: String,
      city: String,
      pincode: Number,
    },

    shipToContact: [
      {
        name: String,
        contact: Number,
        email: String,
      },
    ],
    startDate: {
      type: Date,
      required: [true, "Date is required"],
    },
    endDate: {
      type: Date,
    },
    business: {
      type: String,
    },
    billingFrequency: {
      type: String,
      required: [true, "Please provide billing frequency"],
    },
    area: {
      type: Number,
      required: [true, "Please provide area"],
    },
    specialInstruction: {
      type: String,
    },
    preferred: {
      day: String,
      time: String,
    },
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
