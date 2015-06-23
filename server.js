// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var configDB = require('./config/database.js');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var morgan = require('morgan');

// var server = require('http').createServer(app);


var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');


var port = process.env.PORT || 3000;
var db = require('./app/models/models');


app.set('views', './views');

mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// required for passport
app.use(session({ secret: 'secretsession' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index')
});

app.get('/searchresults', function(req, res){
  res.render('searchresults')
}); 

app.post('/', function(req,res){
  var newSupper = req.body;
  db.Supper.find({ 
    'address.city': req.body.location
  }, function(err, city){
    res.send(city);
    console.log(city);
  });

});


app.listen(port, function(req,res){
  console.log('Running on' + port)
});


