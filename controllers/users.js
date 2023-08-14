const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BedRequestError');
const UnauthorizerError = require('../errors/UnauthorizerError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictingError = require('../errors/ConflictingError');

const OK = 200;
const CREATED = 201;

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(String(password), 10)
    .then((hashedPassword) => {
      User.create({
        email,
        password: hashedPassword,
        name,
      })
        .then((user) => {
          res.status(CREATED).send({
            name: user.name,
            email: user.email,
            _id: user._id,
          });
        })
        .catch((error) => {
          if (error.name === 'ValidationError') {
            next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
          } else if (error.code === 11000) {
            next(new ConflictingError('Пользователь с таким EMAIL уже существует'));
          } else {
            next(error);
          }
        });
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email })
    .select('+password')
    .orFail(() => next(new UnauthorizerError('Введены неправильные данные для входа')))
    .then((user) => {
      bcrypt.compare(String(password), user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            const token = jwt.sign(
              { _id: user._id },
              NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
              { expiresIn: '7d' },
            );
            res.cookie('token', token, {
              maxAge: 3600000 * 24 * 7,
              httpOnly: true,
              sameSite: true,
              secure: true,
            }).send(user.toJSON());
          } else {
            next(new UnauthorizerError('Введены неправильные данные для входа'));
          }
        });
    })
    .catch(next);
};

const signout = (req, res, next) => {
  try {
    res
      .status(OK)
      .clearCookie('token', {
        sameSite: 'none',
        secure: true,
      })
      .send({ message: 'Вы вышли из аккаунта' });
  } catch (error) {
    next(error);
  }
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному ID не найден');
      }
      res.status(OK).send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(error);
      }
    });
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным ID не найден');
      }
      res.status(OK).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      } else if (error.code === 11000) {
        next(new ConflictingError('Пользователь с таким EMAIL уже существует'));
      } else {
        next(error);
      }
    });
};

module.exports = {
  createUser,
  login,
  signout,
  getUserInfo,
  updateUser,
};
