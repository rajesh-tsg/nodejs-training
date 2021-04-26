var express = require('express');
var router = express.Router();
const users = require('../controllers/userController');

/* GET users listing. */
router.get('/', users.getUser);

module.exports = router;
