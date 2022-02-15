const CustomError = require("./custom-error");

class UnAuthenticated extends CustomError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = UnAuthenticated;
