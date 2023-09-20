require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SECRET_KEY } = require('../utils/config');

const {
  HTTP_STATUS_CREATED,
  USER_NOT_FOUND,
  INCORRECT_USER_DATA,
  INCORRECT_UPDATE_USER_DATA,
  EMAIL_ALREADY_REGISTERED,
  INCORRECT_ADD_USER_DATA,
} = require('../utils/constants');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictingError = require('../errors/ConflictError');

const checkData = (data) => {
  if (!data) throw new NotFoundError(USER_NOT_FOUND);
};

const registrationUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      const { _id } = user;
      return res.status(HTTP_STATUS_CREATED).send({
        email,
        name,
        _id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictingError(EMAIL_ALREADY_REGISTERED));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(INCORRECT_ADD_USER_DATA));
      }
      return next(err);
    });
};

const getCurrentUserInfo = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      checkData(user);
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(INCORRECT_USER_DATA));
      }
      return next(err);
    });
};

const editProfileUserInfo = (req, res, next) => {
  const { _id } = req.user;
  const { name, email } = req.body;
  User.findByIdAndUpdate(_id, { name, email }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      checkData(user);
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictingError(EMAIL_ALREADY_REGISTERED));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(INCORRECT_UPDATE_USER_DATA));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SECRET_KEY,
        { expiresIn: '14d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  registrationUser,
  getCurrentUserInfo,
  editProfileUserInfo,
  login,
};
