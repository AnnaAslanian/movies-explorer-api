const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_BAD_REQUEST = 400;
const HTTP_STATUS_UNAUTHORIZED = 401;
const HTTP_STATUS_FORBIDDEN = 403;
const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STATUS_CONFLICT = 409;
const SERVER_ERROR = 500;

const INVALID_AUTH_CREDENTIALS = 'Неправильные почта или пароль';
const INVALID_EMAIL_FORMAT = 'Некорректный email';
const USER_NOT_FOUND = 'Пользователь с указанным идентификатором не найден';
const INCORRECT_USER_DATA = 'Переданы некорректные данные пользователя';
const INCORRECT_UPDATE_USER_DATA = 'Переданы некорректные данные при обновлении профиля';
const INCORRECT_MOVIE_DATA = 'Переданы некорректные данные при добавлении фильма';
const MOVIE_NOT_FOUND = 'Фильм с указанным идентификатором не найден';
const NO_RIGHTS_TO_DELETE_MOVIE = 'У вас недостаточно прав на удаление данного фильма';
const EMAIL_ALREADY_REGISTERED = 'Пользователь с таким email уже зарегистрирован';
const INCORRECT_ADD_USER_DATA = 'Переданы некорректные данные при создании пользователя';
const UNAUTHORIZED_ACCESS = 'Необходима авторизация';
const INCORRECT_URL_FORMAT = 'Некорректный формат ссылки';
const INTERNAL_SERVER_ERROR = 'Ошибка сервера';

module.exports = {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_CONFLICT,
  SERVER_ERROR,
  INCORRECT_URL_FORMAT,
  INVALID_AUTH_CREDENTIALS,
  USER_NOT_FOUND,
  INCORRECT_USER_DATA,
  INCORRECT_UPDATE_USER_DATA,
  INCORRECT_MOVIE_DATA,
  MOVIE_NOT_FOUND,
  NO_RIGHTS_TO_DELETE_MOVIE,
  EMAIL_ALREADY_REGISTERED,
  INCORRECT_ADD_USER_DATA,
  UNAUTHORIZED_ACCESS,
  INTERNAL_SERVER_ERROR,
  INVALID_EMAIL_FORMAT,
};
