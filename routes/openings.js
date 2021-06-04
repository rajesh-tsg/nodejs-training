var express = require('express');
var router = express.Router();
const openingsController = require('../controllers/openingsController');
const auth = require('../middleware/auth');
const authGurad = require('../middleware/authGuard');

/* GET users listing. */
router.get('/jobs', authGurad, openingsController.jobs);
router.get('/opening-details/:openingid', authGurad, openingsController.jobOpeningDetails);

/* APIs */
// router.get('/api/v1/add-', auth, applicationController.getApplicantProfile);
router.get('/api/v1/job-opening-details/:openingid', auth, openingsController.getJobOpeningDetails);
// router.post('/api/v1/add-timeline/:applicationid', auth, applicationController.addTimeline);
router.put('/api/v1/update-opening-status/:openingid', auth, openingsController.updateJobOpeningStatus);
router.post('/api/v1/add-opening', auth, openingsController.addOpening);
router.get('/api/v1/get-openings', auth, openingsController.getJobOpenings);

module.exports = router;
