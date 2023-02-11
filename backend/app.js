require("dotenv").config();
require("express-async-errors");
const cors = require("cors");

const express = require("express");
const app = express();

const morgan = require("morgan");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const uploadImage = require("express-fileupload");

const contractRouter = require("./routes/contract");
const serviceRouter = require("./routes/service");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoute");
const adminRouter = require("./routes/adminRoute");
const feedbackRouter = require("./routes/feedbackRoute");

const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const { authenticateUser } = require("./middleware/auth");

const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// app.use(express.static(path.join(__dirname, "/frontend/build")));
app.use(cors());
app.use(express.static("./public"));
app.use(express.json());
app.use(uploadImage({ useTempFiles: true }));

app.use("/api", authRouter);
app.use("/api/contracts", authenticateUser, contractRouter);
app.use("/api/service", authenticateUser, serviceRouter);
app.use("/api/user", authenticateUser, userRouter);
app.use("/api/admin", authenticateUser, adminRouter);
app.use("/api/feedback", feedbackRouter)

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
// });

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, console.log("server is listing"));
  } catch (error) {
    console.log(error);
  }
};

start();
