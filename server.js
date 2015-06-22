var express = require('express');
var app = express();
var morgan = require('morgan');
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

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
  console.log(newSupper);
})


app.listen(port, function(req,res){
  console.log('Running on' + port)
});


