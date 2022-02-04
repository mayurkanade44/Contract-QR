const express = require("express");
const router = express.Router();

const {
  getAllService,
  createService,
  singleService,
  uploadImage,
  updateCard,
} = require("../controllers/service");

router.route("/").post(createService);
router.route("/:id").get(singleService).patch(updateCard);
router.route("/upload").post(uploadImage);

module.exports = router;
