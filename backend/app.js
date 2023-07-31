var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

require('dotenv').config();
//
// const config = {
//     authRequired: false,
//     auth0Logout: true,
//     secret: process.env.AUTH0_SECRET,
//     baseURL: process.env.CLIENT_URI,
//     clientID: process.env.AUTH0_CLIENT_ID,
//     issuerBaseURL: process.env.AUTH0_ISSUERBASEURL
// };

const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUERBASEURL,
    tokenSigningAlg: 'RS256'
});


var indexRouter = require('./routes/index');
var crimeRouter = require('./routes/crimeRoutes');
var userRouter = require('./routes/userRoutes');
var historyRouter = require('./routes/historyRoutes');

require('./config/database');
const getUserInfo = require("./middleware/auth");

var app = express();

// auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/public/crime', crimeRouter);

app.use(jwtCheck);
app.use('/protected/history', historyRouter);
app.use('/protected/user', getUserInfo, userRouter);

module.exports = app;
