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
  deleteService,
  generateReport,
  getBusinessCount,
  generateBusinessFile,
  dailyReport,
  getAllStats,
  serviceNotDoneReport,
  editService,
  serviceIntimation,
} = require("../controllers/service");

router
  .route("/")
  .post(authorizeUser("Sales", "Admin", "Back Office"), createService)
  .get(getAllService);
router.route("/upload").post(authorizeUser("Operator", "Admin"), uploadImage);
router.route("/allStats").get(getAllStats);
router.route("/serviceNotDone").get(serviceNotDoneReport);
router.route("/dailyReport").get(dailyReport);
router
  .route("/businessDump/:name")
  .get(authorizeUser("Admin"), generateBusinessFile);
router.route("/report/:id").get(authorizeUser("Admin"), generateReport);
router.route("/sendmail/:id").get(authorizeUser("Admin"), sendContractEmail);
router
  .route("/create/:id")
  .get(authorizeUser("Sales", "Admin", "Back Office"), createDoc)
  .patch(authorizeUser("Sales", "Admin"), editService);
router.route("/intimation/:id").post(serviceIntimation);
router
  .route("/:id")
  .get(authorizeUser("Operator", "Admin"), singleService)
  .patch(authorizeUser("Operator", "Admin"), updateCard)
  .delete(authorizeUser("Admin", "Sales"), deleteService);

module.exports = router;
