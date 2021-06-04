var express = require('express');
var router = express.Router();
const authentication = require('../controllers/authenticationController');
const isLoggedIn = require('../middleware/isLoggedIn');

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.get('/admin-login', isLoggedIn, function(req, res, next) {
  res.render('adminLogin', { title: 'Admin Portal - Login' });
});

router.get('/register', function(req, res, next) {
  res.render('registration', { title: 'Register' });
});

router.post('/user-registration', authentication.userRegistration);
router.post('/user-login', authentication.userLogin);
router.get('/logout', authentication.userLogout);
router.post('/api/v1/check-applicant', authentication.applicantLogin);
router.put('/api/v1/forgot-password', authentication.forgotPassword);

module.exports = router;
