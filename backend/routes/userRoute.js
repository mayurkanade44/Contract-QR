const express = require("express");
const router = express.Router();

const { getAllUsers, deleteUser } = require("../controllers/user");

router.route("/").get(getAllUsers)
router.route("/:id").delete(deleteUser)


module.exports = router;