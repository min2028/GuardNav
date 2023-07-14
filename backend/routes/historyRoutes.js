var express = require('express');
var router = express.Router();
var HistoryController = require('../controllers/historyController');


/* GET crime data. */
router.get('/', HistoryController.getData);

/* Add crime data */
router.post('/', HistoryController.addData);

module.exports = router;
