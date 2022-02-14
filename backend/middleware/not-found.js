const notFoundError = (req, res) => {
  res.status(404).json({ msg: "Route Not Found" });
};

module.exports = notFoundError;
