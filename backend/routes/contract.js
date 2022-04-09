const exprees = require("express");
const router = exprees.Router();


const {
  getAllContracts,
  getContract,
  createContract,
  deleteContract,
  updateContract,
} = require("../controllers/contract");

router.route("/").get(getAllContracts).post(createContract);
router
  .route("/:id")
  .get(getContract)
  .delete(deleteContract)
  .patch(updateContract);

module.exports = router;
