const express = require("express");
const router = express.Router();

const { getAllService, createService, uploadCard, singleService } = require("../controllers/service");

router.route("/").post(createService);
router.route("/:id").get(singleService).patch(uploadCard)

module.exports = router;
