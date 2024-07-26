var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/main/index');
var usersRouter = require('./routes/users');
const signedRouter = require('./routes/main/signedandlogin');
const apirouter = require('./routes/api/a');
var app = express();



const accountRouter = require('./routes/api/api');

const session = require('express-session'); //導入session
const mongostore = require('connect-mongo');


app.use(session({
  name : 'sid' , //cookie名稱
  secret : 'gbc' , //簽名
  saveUninitialized :false, //每次請求都設一個cookie來存放session id 匿名用戶可以True
  resave : true, //可以重新保存session
  store : mongostore.create({
      mongoUrl :'mongodb://127.0.0.1:27017/mydatabase',
      
  }),
  cookie : {
      httpOnly : true, //防止cookie被偷偷瀏覽 
      maxAge : 1000 * 30 *60  //7天後cookie過期

  },

}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', accountRouter);
app.use('/', signedRouter);
app.use('/api' ,apirouter)




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('404')
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
