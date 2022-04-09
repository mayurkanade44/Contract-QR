const { UnAuthenticated, UnAuthorizedError } = require("../errors");
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer")) {
    throw new UnAuthenticated("Authentication Invalid");
  }
  const token = authHeaders.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, role: payload.role };
    next();
  } catch (error) {
    throw new UnAuthenticated("Authentication Invalid");
  }
};

const authorizeUser = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnAuthorizedError(
        "You dont have permission, please contact Admin"
      );
    }
    next();
  };
};
module.exports = { authenticateUser, authorizeUser };
