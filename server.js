var express = require('express');
var app = express();
var morgan = require('morgan');
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var db = require('./app/models/models')

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser());
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
    console.log(city);
    res.send(city);
  });

});


app.listen(port, function(req,res){
  console.log('Running on' + port)
});


