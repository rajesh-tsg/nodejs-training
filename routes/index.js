var express = require('express');
var router = express.Router();
const authentication = require('../controllers/authenticationController');
const isLoggedIn = require('../middleware/isLoggedIn');

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.get('/register', function(req, res, next) {
  res.render('registration', { title: 'Register' });
});

router.post('/user-registration', authentication.userRegistration);
router.post('/user-login', authentication.userLogin);
router.get('/logout', authentication.userLogout);

module.exports = router;
