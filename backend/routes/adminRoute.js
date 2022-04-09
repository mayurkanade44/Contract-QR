const express = require("express");
const router = express.Router();
const { authorizeUser } = require("../middleware/auth");

const { addValues, allValues } = require("../controllers/adminController");

router.route("/").post(authorizeUser("Admin"), addValues).get(allValues);

module.exports = router;
