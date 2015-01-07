var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create instance of Schema for user type
var userSchema = new Schema({
	firstName: { 
	  type: String,
	  set: function(name){
	          return "Mr. " +  name;
	  		}
	},

	lastName : String,
	email : String,
	username : {
		type : String,
		unique : true,
		required : true
	},
	password : String,
	created : {
		type: Date,
		default : Date.now
	}
});

// Added the new type to the model
mongoose.model('User', userSchema);
