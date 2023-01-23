const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    contract: { type: String, required: true },
    email: { type: String },
    pestService: { type: String, required: true },
    rating: { type: Number, required: true },
    efficiency: { type: String, required: true },
    work: { type: String, required: true },
    behavior: { type: String, required: true },
    equipment: { type: String, required: true },
    aspect: { type: String },
    improvement: { type: String },
    recommend: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);
