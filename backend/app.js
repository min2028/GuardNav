var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');


var indexRouter = require('./routes/index');
var crimeRouter = require('./routes/crimeRoutes');
var userRouter = require('./routes/userRoutes');
var historyRouter = require('./routes/historyRoutes');
var authRouter = require('./routes/authRoutes');
var {verifyUser} = require('./middleware/auth');

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
app.use('/google/auth', authRouter);
app.use('/protected/history', verifyUser, historyRouter);
app.use('/protected/user', verifyUser, userRouter)

module.exports = app;
