const Admin = require("../models/admin");
const ServiceReport = require("../models/serviceReport");

const addValues = async (req, res) => {
  const { addComment } = req.body;
  const comment = await Admin.create(req.body);
  res.status(201).json({ msg: "Added successfully" });
};

const allValues = async (req, res) => {
  const allValues = await Admin.find({});
  res.status(200).json({ allValues });
};

const serviceCards = async (req, res) => {
  const { contract } = req.query;
  try {
    const cont = await ServiceReport.find({
      contract: { contract, $options: "i" },
    }).select("contract serviceName image serviceDate");
    if (cont.length <= 0)
      return res.status(404).json({ msg: "No Contract Found" });
    const cards = [];

    for (let i = cont.length - 1; i >= 0; i--) {
      if (cards.length > 0 && cont[i].image.length > 0) {
        let temp = cards.filter(
          (item) => item.serviceName === cont[i].serviceName
        );
        if (temp.length === 0) cards.push(cont[i]);
      } else {
        cards.push(cont[i]);
      }
    }
    res.status(200).json({ cards });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addValues, allValues, serviceCards };
