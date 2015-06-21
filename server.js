var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('morgan');

app.get('/', function(req, res) {
  res.render('index')
});

app.listen(port, function(req,res){
  console.log('Now running on port ' + port)
});


