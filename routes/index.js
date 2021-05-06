var express = require('express');
var router = express.Router();
const authentication = require('../controllers/authenticationController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.get('/register', function(req, res, next) {
  res.render('registration', { title: 'Register' });
});

router.post('/user-registration', authentication.userRegistration);
router.post('/user-login', authentication.userLogin);

module.exports = router;
