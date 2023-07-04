var express = require('express');
var router = express.Router();
var UserController = require('../controllers/userController');



/* GET crime data. */
router.get('/', UserController.getAllUsers);

module.exports = router;
