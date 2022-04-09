const express = require("express");
const router = express.Router();
const { authorizeUser } = require("../middleware/auth");

const { getAllUsers, deleteUser } = require("../controllers/user");

router.route("/").get(getAllUsers);
router.route("/:id").delete(authorizeUser("Admin"), deleteUser);

module.exports = router;
