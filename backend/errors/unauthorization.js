const CustomError = require("./custom-error");

class UnAuthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 403;
  }
}

module.exports = UnAuthorizedError;
