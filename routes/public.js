var express = require('express');
var router = express.Router();
const openingsController = require('../controllers/openingsController');
const publicController = require('../controllers/publicController');

/* GET users listing. */
router.get('/join-us/job-opening-details/:openingid', publicController.jobOpeningDetails);
// router.get('/applicants/profile/:profileid', authGurad, applicationController.applicantProfile);

/* APIs */
router.get('/public/api/v1/job-opening-details/:openingid', openingsController.getJobOpeningDetails);

module.exports = router;
