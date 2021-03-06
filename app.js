const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const paginate = require('express-paginate');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const smsRouter = require('./routes/smsAdmin');

const app = express();

const dbUser = '';
const dbPass = '';
const dbURI = '';




// Set up mongoose connection
const mongoose = require('mongoose');
const dev_db_url = 'mongodb://' + dbUser + ':' + dbPass + dbURI;
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(paginate.middleware(10, 50));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/smsAdmin', smsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
