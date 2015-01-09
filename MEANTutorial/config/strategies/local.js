var passport = require('passport');
var LocalPassport = require('passport-local').Strategy;
var User = require('mongoose').model('User');

module.exports = function() {
	passport.use(new LocalPassport(function(username, password, callback) {
		User.findOne({
			'username' : username
		}, function(err, user) {
			if (err) {
				return callback(err);
			} else if (!user) {
				return callback(null, false, {
					message : 'Unknown User'
				});
			} else if (!user.authenticate(password)) {
				return callback(null, false, {
					message : 'Wrong password'
				});
			} else {
				return callback(null, user);
			}
		})
	}));
}