var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session');

var SequelizeStore = require("connect-session-sequelize")(session.Store);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dashboardRouter = require('./routes/dashboard');
var applicationRouter = require('./routes/applications');
var openingRoute = require('./routes/openings');
var publicRouter = require('./routes/public');

const db = require('./db/models/index');

var app = express();

app.use(session({
  store: new SequelizeStore({
    db: db.sequelize,
    checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    expiration: 24 * 60 * 60 * 1000 // The maximum age (in milliseconds) of a valid session.
  }),
  resave: true, saveUninitialized: true, secret: 'XCR3rsasa%RDHHH', cookie: { }}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);
 
// app.get('/', function(req, res) {
//   var locals = {
//     title: 'Page Title',
//     description: 'Page Description',
//     header: 'Page Header'
//   };
//   res.render('the-view', locals);
// });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
  res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});

app.use('/', indexRouter, publicRouter, (req, res, next) => {
  res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});
app.use('/users', usersRouter, dashboardRouter, (req, res, next) => {
  res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});
app.use('/applications', applicationRouter);
app.use('/openings', openingRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

db.sequelize.sync({});
// db.sequelize.sync({ force: true, alter: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

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
