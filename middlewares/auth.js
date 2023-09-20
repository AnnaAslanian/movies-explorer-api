const jwt = require('jsonwebtoken');
const { UNAUTHORIZED_ACCESS } = require('../utils/constants');
const { SECRET_KEY } = require('../utils/config');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(UNAUTHORIZED_ACCESS));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return next(new UnauthorizedError(UNAUTHORIZED_ACCESS));
  }

  req.user = payload;
  return next();
};
