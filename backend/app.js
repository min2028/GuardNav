var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

require('dotenv').config();

const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUERBASEURL,
    tokenSigningAlg: 'RS256'
});
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)


var indexRouter = require('./routes/index');
var crimeRouter = require('./routes/crimeRoutes');
var userRouter = require('./routes/userRoutes');
var historyRouter = require('./routes/historyRoutes')
var messageRouter = require('./routes/messageRoute');
var savedLocationRouter = require('./routes/savedLocationRoutes');

require('./config/database');
const getUserInfo = require("./middleware/getUserInfo");

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/public/crime', crimeRouter);

app.use(jwtCheck);
app.use('/protected/user', getUserInfo, userRouter);
app.use('/protected/history', historyRouter);
app.use('/protected/message', messageRouter);
app.use('/protected/savedLocation', savedLocationRouter)

module.exports = app;
