const exprees = require("express");
const router = exprees.Router();
const {
  createFeedback,
  addContacts,
  scheduleMail,
  getFeedback,
} = require("../controllers/feedbackController");

router.route("/getFeedback").get(getFeedback);
router.route("/addContacts").put(addContacts);
router.route("/schedule").put(scheduleMail);
router.route("/:email/:id").post(createFeedback);


module.exports = router;
