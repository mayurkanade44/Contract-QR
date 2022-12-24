const express = require("express");
const router = express.Router();
const { authorizeUser, authenticateUser } = require("../middleware/auth");

const { register, login } = require("../controllers/authController");
const { feedback } = require("../controllers/service");
const { serviceCards } = require("../controllers/adminController");

router
  .route("/register")
  .post(authenticateUser, authorizeUser("Admin"), register);
router.route("/login").post(login);
router.route("/feedback/:id").post(feedback);
router.route("/serviceCard").get(serviceCards)

module.exports = router;
