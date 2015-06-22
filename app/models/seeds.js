var REPL = require('repl');
var db = require('./models');

var repl = REPL.start(' > ');

repl.context.db = db;

db.Supper.collection.remove();
db.User.collection.remove();
db.Address.collection.remove();

db.Supper.create({
  address: {
    firstLine: '21',
    secondLine: 'High Street',
    city: 'Galway',
    postCode: 'EH6 4BQ'
  },
  date: '24/07/2015'
}, function(err, supper){
  console.log(supper);
});

db.User.create({
  name: 'Anna Gaughan',
  password: 'anna',
  email: 'anna@anna.com'
}, function(err, user){
  console.log(user);
});

console.log('Seeded')











