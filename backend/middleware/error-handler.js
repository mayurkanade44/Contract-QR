const errorHandler = (err, req, res, next) => {
  
  const defaultError = {
    status: err.status || 500,
    msg:  err.message || "Something went wrong, try again later",
  };
  if ((err.name === "ValidationError")) {
    defaultError.status = 400;
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }
  return res.status(defaultError.status).json({ msg: defaultError.msg });
};

module.exports = errorHandler;
