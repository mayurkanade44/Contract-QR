const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  commentsList: {
    type: String,
  },
  sales: {
    type: String,
  },
  business: {
    type: String,
  },
});

module.exports = mongoose.model("Admin", AdminSchema);
