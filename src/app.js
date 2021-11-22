var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
let session = require('express-session');

/* Routes */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var adminRouter = require('./routes/admin');
/* var apiRouter = require('./routes/apiRoutes.js'); */
const localsCheck = require('./middlewares/localsCheck')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* Middlewares */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'));
app.use(session({ 
  secret: "mySecret", 
  resave: false, 
  saveUninitialized: true ,
  cookie: { maxAge: (1000 * 60) * 60 }
}));
app.use(localsCheck)

/* Rutas */
app.use('/', indexRouter)
app.use('/users', usersRouter); // register - login - profile - CRUD de info personal para usuarios
app.use('/products', productsRouter); // list - detail - cart - CRUD de productos para usuarios
app.use('/admin', adminRouter); // index - CRUD de info personal para admin - CRUD de productos para admin
/* app.use('/api', apiRouter); */ // APIs

/* app.use((req, res, next) => {
  res.status(404).render('error');
}); */

// catch 404 and forward to error handler
/* app.use(function(req, res, next) {
  next(createError(404));
}); */

// error handler
/* app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}); */

module.exports = app;
