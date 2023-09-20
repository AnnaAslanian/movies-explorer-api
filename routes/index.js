const router = require("express").Router();
const NotFoundError = require("../errors/NotFoundError");

const usersRouter = require("./users");
const moviesRouter = require("./movies");

const { login, registrationUser } = require("../controllers/users");
const validator = require("../middlewares/validation");
const { auth } = require("../middlewares/auth");

router.post("/signin", validator.loginJoi, login);
router.post("/signup", validator.registrationUserJoi, registrationUser);
router.use(auth);
router.use("/users", usersRouter);
router.use("/movies", moviesRouter);
router.use("*", (req, res, next) => next(new NotFoundError("Страница не найдена")));

module.exports = router;
