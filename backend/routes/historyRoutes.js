var express = require('express');
var router = express.Router();
var HistoryController = require('../controllers/historyController');


router.post('/', HistoryController.addHistoryItem);
router.delete('/', HistoryController.clearHistory);
router.put('/:id/favourite', HistoryController.updateHistoryFavourite);

module.exports = router;
