var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/authController');
const {refreshTokenMiddleware} = require("../middleware/auth");

router.get('/oauth-callback', AuthController.oauthCallback);
router.get('/oauth-refresh', refreshTokenMiddleware, AuthController.refreshToken);

module.exports = router;
