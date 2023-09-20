const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const mongoose = require('mongoose');
const { INVALID_AUTH_CREDENTIALS } = require('../utils/constants');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => isEmail(value),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(INVALID_AUTH_CREDENTIALS);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError(INVALID_AUTH_CREDENTIALS);
        }
        return user;
      });
    });
};

const User = mongoose.model('user', userSchema);
module.exports = User;
