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
  menu: {
    veggie: true,
    vegan: false,
    dishes: ["bangers and mash", "chocolate cake"]
  }
}, function(err, supper){
  console.log("********");
  console.log(supper);
});

db.User.create({
  name: 'Anna Gaughan',
  password: 'anna',
  email: 'anna@anna.com'
}, function(err, user){
  console.log("inside user create");
  console.log(user);
});

db.Supper.create({
  description: "Yummy"
}, function(err, supper){
  console.log("inside supper create");
  console.log(supper);
});



// console.log('Seeded')











