const exprees = require("express");
const router = exprees.Router();
const {
  createFeedback,
  addContacts,
  scheduleMail,
  getFeedback,
  sendMails,
} = require("../controllers/feedbackController");
const {
  autoBranchReport,
  monthlyBranchServiceDue,
  contractCodeReport,
} = require("../controllers/service");

router.route("/getFeedback").get(getFeedback);
router.route("/addContacts").put(addContacts);
router.route("/schedule").put(scheduleMail);
router.route("/sendMails").put(sendMails);
router.get("/autoBranchReport", autoBranchReport);
router.get("/contractCodeReport", contractCodeReport);
router.get("/monthlyService/:id", monthlyBranchServiceDue);
router.route("/:id").post(createFeedback);

module.exports = router;
