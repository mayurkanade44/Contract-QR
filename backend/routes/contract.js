const exprees = require("express");
const router = exprees.Router();

const {
  getAllContracts,
  getContract,
  createContract,
  deleteContract,
  updateContract,
  generateQR,
} = require("../controllers/contract");

router.route("/").get(getAllContracts).post(createContract);
router.route("/qr/:id").get(generateQR);
router
  .route("/:id")
  .get(getContract)
  .delete(deleteContract)
  .patch(updateContract);

module.exports = router;
