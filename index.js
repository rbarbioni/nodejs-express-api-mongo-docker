// DECLARATIONS
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')
var mongoose = require('mongoose');
var app = express();

// DATABASE
var databaseURL = 'mongodb://192.168.1.100:27017/test';
mongoose.connect(databaseURL,  function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + databaseURL + '.' + err);
  } else {
    console.log ('Succeeded connected to: ' + databaseURL);
  }
});


// APPLICATION SETUP
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APPLICATION ROUTE DECLARATION
var users = require('./app/controllers/users');


// APPLICATION ROUTE SETUP
app.use('/api/user', users);


// PAGE SETUP
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '/app/views')));

// APPLICATION SETUP
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// DEFAULT HANDLERS
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  //console.log(err);
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  //console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  var error = {
    'status': err.status,
    'message': err.message
  }
  res.send(error);
});

// SINGLE PAGE APPLICATION INDEX (ANGULAR-JS)
app.get('/', function(req, res) {
  res.render('app/views/index')
});



// HEROKU SETUP
app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

