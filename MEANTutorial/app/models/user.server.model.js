var mongoose = require('mongoose');
var crypto = require('crypto');
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
	username : {type : String,	unique : true,	required : 'Username is required',	trim : true},
	password : String,
	salt : String,
	provider : {type : String,	required : 'Provider is required'},
	providerId : String,
	providerData : {},
	created : {		type: Date,		default : Date.now	}
});

userSchema.virtual('fullName')
.get(function() {
    return this.firstName + ' ' + this.lastName;
})
.set(function(fullName) {
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

// Defining pre save method
userSchema.pre('save', function(next){
	if (this.password){
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
		next();
	}
});

// Instance method to return hash of password
userSchema.methods.hashPassword = function(password){
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

// Instance method to authenticate
userSchema.methods.authenticate = function(password){
	var hashPass = this.hashPassword(password);
	var loginSuccess = this.password === hashPass;
	return loginSuccess;
};


// Class method to find uniqueUsername
userSchema.statics.findUniqueUserName = function(username, prefix, callback){
	var _this = this; 
	var possibleUsername = username + (suffix || ''); 
	_this.findOne({ username: possibleUsername }, function(err, user){ 
		if (!err) { 
			if (!user) { 
				callback(possibleUsername); 
		    } else { 
		    	return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
				} 
			} else { callback(null); } 
		}); 	
}

userSchema.set('toJSON', {
	getters : true,
	virtuals : true
})

// Added the new type to the model
mongoose.model('User', userSchema);
