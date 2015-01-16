var passport = require('passport');
var mongoose = require('mongoose');

module.exports = function(){
	var User = mongoose.model('User');
	
	passport.serializeUser(function(user, callback){
		callback(null, user.id);
	});
	
	passport.deserializeUser(function(id, callback){
		User.find({'_id':id}, '-password -salt', function(err, user){ // Mongoose will not load password, salt
			console.log('In deserialize. User is ' + JSON.stringify(user));
			callback(err, user);
		});
	});
	
	require('./strategies/local.js')();
}

 