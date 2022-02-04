require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

const cloudinary = require("cloudinary").v2;
const uploadImage = require("express-fileupload");

const contractRouter = require("./routes/contract");
const serviceRouter = require("./routes/service");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

app.use(express.static("./public"));
app.use(express.json());
app.use(uploadImage({ useTempFiles: true }));

app.use("/api/contracts", contractRouter);
app.use("/api/service", serviceRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(5000, console.log("server is listing"));
  } catch (error) {
    console.log(error);
  }
};

start();
