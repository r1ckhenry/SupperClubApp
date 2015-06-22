var REPL = require('repl');
var db = require('./models');

var repl = REPL.start(' > ');

repl.context.db = db;

db.base.models.Supper.collection.remove();
db.base.models.User.collection.remove();
db.base.models.Address.collection.remove();

db.base.models.Supper.create({
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

db.base.models.User.create({
  name: 'Anna Gaughan',
  password: 'anna',
  email: 'anna@anna.com'
}, function(err, user){
  console.log(user);
});

console.log('Seeded')











