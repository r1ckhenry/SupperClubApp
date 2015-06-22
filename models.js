var mongoose =  require('mongoose');
mongoose.connect("mongodb://localhost/supperdb");

var UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  suppersCreated: [],
  suppersAttending: []
});

var SupperSchema = ({
  address: [addressSchema],
  date: Date
});

var addressSchema = ({
  firstLine: String,
  secondLine: String,
  city: String,
  postCode: String
});