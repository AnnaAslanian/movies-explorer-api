const { HTTP_STATUS_UNAUTHORIZED } = require("../utils/constants");

module.exports = class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
};
