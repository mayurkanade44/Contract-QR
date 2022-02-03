const express = require("express");
const router = express.Router();

const { getAllService, createService } = require("../controllers/service");

router.route("/").post(createService);

module.exports = router;
