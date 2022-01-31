require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

const contractRouter = require('./routes/contract')

app.use(express.json())

app.use('/api/contracts', contractRouter)

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    var today = new Date(2020, 3, 24);
    var lastDayOfMonth = new Date(today.getFullYear()+1, today.getMonth()-1, 1);
    console.log(lastDayOfMonth)
    app.listen(5000, console.log("server is listing"));
  } catch (error) {
    console.log(error);
  }
};

start();
