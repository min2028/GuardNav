var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');


var indexRouter = require('./routes/index');
var crimeRouter = require('./routes/crimeRoutes');
var userRouter = require('./routes/userRoutes');
var historyRouter = require('./routes/historyRoutes');
var {verifyUser, authErrorHandler} = require('./middleware/auth');

require('./config/database');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/public/crime', crimeRouter);
app.use('/protected/history', verifyUser, authErrorHandler, historyRouter);
app.use('/protected/user', verifyUser, authErrorHandler, userRouter)

module.exports = app;
