var express = require('express');
var router = express.Router();
var UserController = require('../controllers/userController');


router.get('/', UserController.getUser);
router.patch('/:id/name', UserController.updateUserName);
router.patch('/:id/number', UserController.updateUserNumber);

module.exports = router;
