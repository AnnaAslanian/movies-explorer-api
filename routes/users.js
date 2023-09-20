const router = require('express').Router();
const validator = require('../middlewares/validation');
const { getCurrentUserInfo, editProfileUserInfo } = require('../controllers/users');

router.get('/me', getCurrentUserInfo);
router.patch('/me', validator.updateUserJoi, editProfileUserInfo);

module.exports = router;
