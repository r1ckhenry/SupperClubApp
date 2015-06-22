// set up ======================================================================
// get all the tools we need
var app = express();
var bodyParser = require('body-parser');
var configDB = require('./config/database.js');
var cookieParser = require('cookie-parser');
var express = require('express');
var flash = require('connect-flash');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

var port = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost/supperdatabase"); // connect to our database

// require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// required for passport
app.use(session({ secret: 'secretsession' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// require('./config/passport')(passport); // pass passport for configuration

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.set('view engine', 'ejs');
app.set('morgan');

app.get('/', function(req, res) {
  res.render('index')
});

app.listen(port, function(req,res){
  console.log('Now running on port ' + port)
});


