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
    dishes: ["bangers and mash", "chocolate cake"],
    cuisine: ["Italien"],
    drinks: ["wine"]
  },
  guest: 12,
  description: "Donut marzipan donut apple pie. Jelly-o topping sesame snaps oat cake cake caramels. Jelly-o marzipan jujubes bear claw jujubes fruitcake cupcake. Icing lemon drops macaroon bonbon tootsie roll. Marshmallow sesame snaps cupcake gummies cookie caramels sugar plum. Cookie cake chupa chups sugar plum cotton candy jelly-o lemon drops sesame snaps candy canes. Cotton candy tiramisu halvah. Croissant donut marzipan dragée powder. Apple pie toffee cheesecake tart. Jelly-o cotton candy chocolate candy bonbon marzipan chocolate cake. Bear claw marzipan gummi bears gingerbread lemon drops tart pie. Cake chocolate bar cake jelly-o. Sweet roll gingerbread sugar plum. Oat cake carrot cake jujubes caramels chocolate bar.",
  dressCode: "casual",
  reviews: [8,9]

}, function(err, supper){
  console.log("********");
  console.log(supper);
});

db.User.create({
  name: 'Anna Gaughan',
  password: 'anna',
  email: 'anna@anna.com',
  address: {
    firstLine: '34',
    secondLine: 'Sloe Street',
    city: 'London',
    postCode: 'EC6 4BQ'
  }
}, function(err, user){
  console.log("inside user create");
  console.log(user);
});





console.log('Seeded')











