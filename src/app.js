var createError = require('http-errors');
var express = require('express');
var passport = require('passport');
var debug = require('debug')('msn3server:server');
var http = require('http');
var https = require('https');
var fs = require('fs');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
require('dotenv').config();

var router = require('./routes/index');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.URL, { useNewUrlParser: true, }).then((db) => {
  console.log('\n connencted Successfully\n');
}, (err) => {
  console.log("connention to Database Faild \n", err);
  process.exit(1);
});

var app = express();

app.all('*', (req, res, next) => {
  if (req.secure) {
    return next();
  } else {
    res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
  }
});


// view engine setup
app.set('views', './views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SECRET_KEY
}));
app.use(passport.initialize());
app.use(router);

app.use(express.static('./public'));


// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//WWW
//WWW
//WWW
//WWW

var server = http.createServer(app);

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
app.set('secPort', port + 443);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

var options = {
  key: fs.readFileSync(__dirname + '\\private.key'),
  cert: fs.readFileSync(__dirname + '\\certificate.cert')
};

var secServer = https.createServer(options, app);

secServer.listen(app.get('secPort'), () => {
  console.log('sec Server listening on port ', app.get('secPort'));
});

secServer.on('error', onError);
secServer.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}