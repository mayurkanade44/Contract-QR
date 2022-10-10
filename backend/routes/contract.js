const exprees = require("express");
const router = exprees.Router();
const { authorizeUser } = require("../middleware/auth");

const {
  getAllContracts,
  getContract,
  createContract,
  deleteContract,
  updateContract,
  fileUpload,
  deleteFile,
} = require("../controllers/contract");

router
  .route("/")
  .get(getAllContracts)
  .post(authorizeUser("Sales", "Admin", "Back Office"), createContract);
router
  .route("/:id")
  .get(getContract)
  .delete(authorizeUser("Admin"), deleteContract)
  .patch(authorizeUser("Admin"), updateContract);
router.route("/uploadDoc/:id").post(fileUpload).patch(deleteFile);

module.exports = router;
