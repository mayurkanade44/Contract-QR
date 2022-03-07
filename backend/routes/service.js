const express = require("express");
const router = express.Router();

const {
  getAllService,
  createService,
  singleService,
  uploadImage,
  updateCard,
  createDoc,
} = require("../controllers/service");

router.route("/").post(createService).get(getAllService);
router.route("/:id").get(singleService).patch(updateCard);
router.route("/upload").post(uploadImage);
router.route("/create/:id").get(createDoc);

module.exports = router;
