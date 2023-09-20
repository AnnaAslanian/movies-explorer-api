const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const {
  HTTP_STATUS_CREATED,
  NO_RIGHTS_TO_DELETE_MOVIE,
  INCORRECT_MOVIE_DATA,
  MOVIE_NOT_FOUND,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  const userId = req.user._id;

  Movie.find({ owner: userId })
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(INCORRECT_MOVIE_DATA));
      }
      return next(err);
    });
};

const addMovie = (req, res, next) => {
  const owner = req.user._id;
  const movieData = { ...req.body, owner };

  Movie.create(movieData)
    .then((movie) => movie.populate('owner'))
    .then((populatedMovie) => res.status(HTTP_STATUS_CREATED).send(populatedMovie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(INCORRECT_MOVIE_DATA));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { _id: movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) throw new NotFoundError(MOVIE_NOT_FOUND);

      const ownerId = movie.owner.valueOf();
      const userId = req.user._id;

      if (ownerId !== userId) {
        return next(new ForbiddenError(NO_RIGHTS_TO_DELETE_MOVIE));
      }
      return movie.deleteOne();
    })
    .then((deletedMovie) => res.send(deletedMovie))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new BadRequestError(INCORRECT_MOVIE_DATA));
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
