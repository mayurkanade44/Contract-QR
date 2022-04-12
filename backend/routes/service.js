const express = require("express");
const router = express.Router();
const { authorizeUser } = require("../middleware/auth");

const {
  getAllService,
  createService,
  singleService,
  uploadImage,
  updateCard,
  createDoc,
  sendContractEmail,
} = require("../controllers/service");

router
  .route("/")
  .post(authorizeUser("Sales", "Admin", "Back Office"), createService)
  .get(getAllService);
router.route("/upload").post(authorizeUser("Operator", "Admin"), uploadImage);
router
  .route("/sendmail")
  .get(authorizeUser("Sales", "Admin"), sendContractEmail);
router
  .route("/create/:id")
  .get(authorizeUser("Sales", "Admin", "Back Office"), createDoc);
router
  .route("/:id")
  .get(authorizeUser("Operator", "Admin"), singleService)
  .patch(authorizeUser("Operator", "Admin"), updateCard);

module.exports = router;
