var express = require('express');
var router = express.Router();
var MessageController = require('../controllers/messageController');

router.post('/', MessageController.sendMessage);

module.exports = router;