const express = require("express");
const router = express.Router();
const { authorizeUser, authenticateUser } = require("../middleware/auth");

const { register, login } = require("../controllers/authController");
const { feedback } = require("../controllers/service");

router
  .route("/register")
  .post(authenticateUser, authorizeUser("Admin"), register);
router.route("/login").post(login);
router.route("/feedback/:id").post(feedback);

module.exports = router;
