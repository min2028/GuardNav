var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/authController');

router.get('/oauth-callback', AuthController.oauthCallback);

module.exports = router;
