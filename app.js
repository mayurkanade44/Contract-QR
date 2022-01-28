require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(5000, console.log("server is listing"));
  } catch (error) {
    console.log(error);
  }
};

start();
