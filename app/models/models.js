// app/models/user.js
// load the things we need
var bcrypt   = require('bcrypt-nodejs');
var mongoose =  require('mongoose');
// mongoose.connect("mongodb://localhost/supperdatabase");

var AddressSchema = new mongoose.Schema({
  firstLine: {type:String, default:""},
  secondLine: {type:String, default:""},
  city: {type:String, default:""},
  postCode: {type:String, default:""}
});

var UserSchema = new mongoose.Schema({
  name: {type:String, default:""},
  password: {type:String, default:""},
  email: {type:String, default:""},
  bio: {type:String, default:""},
  image: {type:String, default:"https://lh3.googleusercontent.com/-38hgaEA1tdY/AAAAAAAAAAI/AAAAAAAAAAA/FUjS-p5xJ4Q/photo.jpg"},
  address: [AddressSchema],
  suppersCreated: {type:Array, default:[]},
  suppersAttending: {type:Array, default:[]},
  payments: {type:Array, default:[]},
  faveCuisines: {type:Array, default:[]},
  allReviews: {type:Array, default:[]}
});

var MenuSchema = new mongoose.Schema({
  veggie: {type:Boolean, default: false},
  vegan: {type:Boolean, default: false},
  dishes: {type:Array, default:[]},
  cuisine: {type:Array, default:[]},
  drinks: {type:Array, default:[]}
});

var SupperSchema = new mongoose.Schema({
  address: [AddressSchema],
  menu: [MenuSchema],
  date: {type:Date, default: Date.now},
  guest: {type:Number, default: 0},
  title: {type:String, default:""},
  description: {type:String, default:""},
  image: {type:String, default:"http://supperrestaurant.com/wp-content/uploads/2013/06/supper-feature.jpg"},
  dressCode: {type:String, default:""},
  reviews: {type:Array, default:[]}
}); 

// methods ======================
// generating a hash
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = {
  User: mongoose.model('User', UserSchema),
  Supper: mongoose.model('Supper', SupperSchema),
  Address: mongoose.model('Address', AddressSchema),
  Menu: mongoose.model('Menu', MenuSchema)
}
