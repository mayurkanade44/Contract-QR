const mongoose = require("mongoose");

const ContractSchema = new mongoose.Schema(
  {
    contractNo: {
      type: Number,
      required: [true, "Service contract number is required"],
    },
    billToAddress: [
      {
        name: String,
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
      { name: String, address: String, nearBy: String, pincode: Number },
    ],
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
    billingFrequency: {
      type: String,
      required: [true, "Please provide billing frequency"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ContractSchema.pre("save", async function () {
  const salt = await this.startDate;
  let lastDate = new Date(
    salt.getFullYear(),
    salt.getMonth(),
    salt.getUTCDate()
  );

  this.endDate = await new Date(
    lastDate.getFullYear() + 1,
    lastDate.getMonth(),
    0
  );
});

ContractSchema.virtual("services", {
  ref: "Service",
  localField: "_id",
  foreignField: "contract",
  justOne: false,
});

module.exports = mongoose.model("Contract", ContractSchema);
