var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//este proyecto va a requerir la dependencia 
//variables de entorno
require('dotenv').config();
var session = require('express-session');
var fileUpload = require(`express-fileupload`);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


//creo rutas, este archivo se guarda en routes.

var EcommerceRouter = require('./routes/Ecommerce'); 
//crear Ecommerce.js
var MayoristaRouter = require('./routes/Mayorista');
//crear Mayorista.js
var MarketplaceRouter = require('./routes/Marketplace');
//crear Marketplace.js
var loginRouter = require('./routes/admin/login');
//crear admin.js login.js
var adminRouter = require ('./routes/admin/novedades');
//crear novedades.js
var testimoniosRouter = require ('./routes/admin/testimonios');
//crear testimonios.js



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use (session({

  secret:'12w45qelqe4qleq54eq5',
  resave: false,
  saveUninitialized: true

}));

secured = async (req,res,next) => {

  try{
    console.log (req.session.id_usuario);
    if(req.session.id_usuario){
      next();
    }
    else{
      res.redirect('/admin/login')
    }
  } catch (error){
      console.log(error);
  }
}

app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:`/tmp/`

}));


app.use('/', indexRouter);
app.use('/users', usersRouter);

//creamos los manejadores de rutas

app.use('/Ecommerce', EcommerceRouter);
app.use('/Mayorista', MayoristaRouter);
app.use('/Marketplace', MarketplaceRouter);
app.use('/admin/login', loginRouter);
app.use ('/admin/novedades',secured, adminRouter);
app.use ('/admin/testimonios', testimoniosRouter);

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
