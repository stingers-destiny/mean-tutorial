var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create instance of Schema for user type
var userSchema = new Schema({
	firstName : String,
	lastName : String,
	email : String,
	username : String,
	password : String	
});

// Added the new type to the model
mongoose.model('User', userSchema);
