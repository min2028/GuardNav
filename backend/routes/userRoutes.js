var express = require('express');
var router = express.Router();
var UserController = require('../controllers/userController');

router.get('/', UserController.getUser);

module.exports = router;
