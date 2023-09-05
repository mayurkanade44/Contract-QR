const exprees = require("express");
const router = exprees.Router();
const {
  createFeedback,
  addContacts,
  scheduleMail,
  getFeedback,
  sendMails,
} = require("../controllers/feedbackController");
const { autoBranchReport } = require("../controllers/service");

router.route("/getFeedback").get(getFeedback);
router.route("/addContacts").put(addContacts);
router.route("/schedule").put(scheduleMail);
router.route("/sendMails").put(sendMails);
router.route("/:id").post(createFeedback);
router.get("/autoBranchReport", autoBranchReport);

module.exports = router;
