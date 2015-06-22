var mongoose =  require('mongoose');
mongoose.connect("mongodb://localhost/supperdatabase");

var UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  suppersCreated: Array,
  suppersAttending: Array
});

var AddressSchema = new mongoose.Schema({
  firstLine: String,
  secondLine: String,
  city: String,
  postCode: String
});

var SupperSchema = new mongoose.Schema({
  address: [AddressSchema],
  date: String
}); 

var User = mongoose.model('User', UserSchema);
var Supper = mongoose.model('Supper', SupperSchema);
var Address = mongoose.model('Address', AddressSchema);

module.exports.User = User;
module.exports.Supper = Supper;
module.exports.Address = Address;

