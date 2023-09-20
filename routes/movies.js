const router = require('express').Router();
const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');
const validator = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', validator.addMoviesJoi, addMovie);
router.delete('/:_id', validator.deletedMovieJoi, deleteMovie);

module.exports = router;
