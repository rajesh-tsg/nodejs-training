var express = require('express');
var router = express.Router();
const users = require('../controllers/userController');
const auth = require('../middleware/auth');

/* GET users listing. */
router.get('/', auth, users.getUser);

module.exports = router;
