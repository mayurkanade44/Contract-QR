const exprees = require("express");
const router = exprees.Router();
const {
  createFeedback,
  addContacts,
  scheduleMail,
} = require("../controllers/feedbackController");

router.route("/").post(createFeedback);
router.route("/addContacts").put(addContacts);
router.route("/schedule").put(scheduleMail);

module.exports = router;
