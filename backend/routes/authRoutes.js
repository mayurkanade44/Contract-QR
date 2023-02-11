const express = require("express");
const router = express.Router();
const { authorizeUser, authenticateUser } = require("../middleware/auth");

const { register, login } = require("../controllers/authController");
const {
  serviceCards,
  contractDetails,
} = require("../controllers/adminController");
const { createReport } = require("../controllers/report");

router
  .route("/register")
  .post(authenticateUser, authorizeUser("Admin"), register);
router.route("/login").post(login);
router.route("/serviceCard").get(serviceCards);
router.route("/createReport").post(createReport);
router.route("/contractDetails").get(contractDetails);

module.exports = router;
