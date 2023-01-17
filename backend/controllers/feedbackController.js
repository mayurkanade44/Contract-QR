const Feedback = require("../models/feedback");
const client = require("@sendgrid/client");
const Contract = require("../models/contract");
client.setApiKey(process.env.SENDGRID_API_KEY);

const createFeedback = async (req, res) => {
  const { rating, efficiency, work, behavior, equipment, pestService } =
    req.body;
  const { email, id } = req.params;
  try {
    if (!efficiency || !work || !behavior || !equipment || !pestService)
      return res.status(400).json({ msg: "Please provide all values" });

    const contact = await Contract.findOne({ _id: id });
    if (!contact) return res.status(404).json({ msg: "Contract Not Found" });

    req.body.contract = contact.contractNo;
    req.body.email = email;

    await Feedback.create(req.body);

    res.status(201).json({
      msg: "We thank you for your time spent taking this feedback. Your response has been recorded",
    });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};

const addContacts = async (req, res) => {
  const { feedbackEmails } = req.body;

  const queryParams = {
    delete_all_contacts: "true",
  };

  const request1 = {
    url: `/v3/marketing/contacts`,
    method: "DELETE",
    qs: queryParams,
  };

  client
    .request(request1)
    .then(([response, body]) => {
      const data = {
        contacts: req.body,
      };

      const request = {
        url: `/v3/marketing/contacts`,
        method: "PUT",
        body: data,
      };

      client
        .request(request)
        .then(([response, body]) => {
          res.status(200).json({ msg: "Contacts has been added" });
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
};

const scheduleMail = async (req, res) => {
  try {
    const curDate = new Date().toISOString().split("T")[0];
    const time = new Date(curDate + "T11:22:00.542Z");

    const data = {
      name: "Feedback Mail",
      send_to: { all: true },
      email_config: {
        design_id: "4c7a338a-c5d7-4a6b-9c31-a563bb5140ac",
        sender_id: 3405907,
        suppression_group_id: -1,
      },
    };

    const request = {
      url: `/v3/marketing/singlesends`,
      method: "POST",
      body: data,
    };

    client
      .request(request)
      .then(([response, body]) => {
        const data1 = {
          send_at: "now",
        };

        const request1 = {
          url: `/v3/marketing/singlesends/${response.body.id}/schedule`,
          method: "PUT",
          body: data1,
        };

        client
          .request(request1)
          .then(([response, body]) => {
            res.status(200).json({ msg: "Email has been schedule" });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
};

const reop = async () => {
  if (service.contract.feedbackMail) {
    const feedbackPresent = await Feedback.findOne({
      contract: emailSub,
    }).sort("-createdAt");
    if (!feedbackPresent) {
      await sendFeedbackMail(emails);
      return;
    }
    const date = new Date();
    const feedbackMonth = new Date(feedbackPresent.createdAt);
    if (date.getMonth() === feedbackMonth.getMonth())
      return console.log("Already have feedback");
  }
};

module.exports = {
  createFeedback,
  scheduleMail,
  addContacts,
};
