const { celebrate, Joi } = require('celebrate');

const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]+\.[a-zA-Z0-9()]+\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;

const loginJoi = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const registrationUserJoi = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const addMoviesJoi = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(URL_REGEX),
    trailerLink: Joi.string().required().regex(URL_REGEX),
    thumbnail: Joi.string().required().regex(URL_REGEX),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const updateUserJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

const deletedMovieJoi = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  URL_REGEX,
  updateUserJoi,
  addMoviesJoi,
  deletedMovieJoi,
  registrationUserJoi,
  loginJoi,
};
