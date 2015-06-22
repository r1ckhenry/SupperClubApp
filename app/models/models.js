// app/models/user.js
// load the things we need
var bcrypt   = require('bcrypt-nodejs');
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

// methods ======================
// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
// module.exports = mongoose.model('Supper', SupperSchema);
// module.exports = mongoose.model('Address', AddressSchema);
