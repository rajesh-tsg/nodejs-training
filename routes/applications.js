var express = require('express');
var router = express.Router();
const applicationController = require('../controllers/applicationController');
const auth = require('../middleware/auth');

/* GET users listing. */
router.get('/applicants', applicationController.getApplicants);

module.exports = router;
