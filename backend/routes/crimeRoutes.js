var express = require('express');
var router = express.Router();
var CrimeController = require('../controllers/crimeController');


/* GET crime data. */
router.get('/', CrimeController.getData);

/* Add crime data */
router.post('/', CrimeController.addData);

module.exports = router;
