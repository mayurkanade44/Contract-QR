const BadRequestError = require("./bad-request");
const NotFound = require("./not-found");
const UnAuthenticated = require("./unauthenticated");
const UnAuthorizedError = require("./unauthorization")

module.exports = {
  BadRequestError,
  NotFound,
  UnAuthenticated,
  UnAuthorizedError
};
