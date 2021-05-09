var express = require('express');
var router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authGuard = require('../middleware/authGuard');

/* GET home page. */
router.get('/dashboard', authGuard, dashboardController.getDashboard);

module.exports = router;
