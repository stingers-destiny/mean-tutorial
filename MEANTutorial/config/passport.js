var passport = require('passport');
var mongoose = require('mongoose');

module.exports = function(){
	var User = mongoose.model('User');
	
	passport.serializeUser(function(user, callback){
		callback(null, user.username);
	});
	
	passport.deserializeUser(function(username, callback){
		User.findOne({'username':username}, '-password -salt', function(err, user){ // Mongoose will not load password, salt
			callback(err, user);
		});
	});
	
	require('./strategies/local.js')();
}

 