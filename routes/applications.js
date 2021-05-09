var express = require('express');
var router = express.Router();
const applicationController = require('../controllers/applicationController');
const auth = require('../middleware/auth');
const authGurad = require('../middleware/authGuard');

/* GET users listing. */
router.get('/applicants', authGurad, applicationController.getApplicants);

module.exports = router;
