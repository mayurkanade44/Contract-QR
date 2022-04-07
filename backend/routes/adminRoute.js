const express = require("express");
const router = express.Router();

const { addValues, allValues } = require("../controllers/adminController");

router.route("/").post(addValues).get(allValues);


module.exports = router;