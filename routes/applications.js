var express = require('express');
var router = express.Router();
const applicationController = require('../controllers/applicationController');
const auth = require('../middleware/auth');
const authGurad = require('../middleware/authGuard');

/* GET users listing. */
router.get('/applicants', authGurad, applicationController.applicants);
router.get('/applicants/profile/:profileid', authGurad, applicationController.applicantProfile);

/* APIs */
router.get('/api/v1/:applicationid', auth, applicationController.getApplicantProfile);

module.exports = router;
