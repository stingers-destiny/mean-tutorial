var User = require('mongoose').model('User');

exports.create = function(req, resp, next) {
	var user = new User(req.body);
	user.save(function(err) {
		if (err) {
			return next(err);
		} else {
			resp.json(user);
		}
	});
};

exports.list = function(req, resp, next) {
	User.find({}, function(err, users) {
		if (err) {
			return next(err);
		} else {
			resp.json(users);
		}
	});
};

exports.read = function(req, resp, next) {
	resp.json(req.user);
};

exports.userByUserName = function(req, resp, next, username) {
	User.findOne({
		'username' : username
	}, function(err, user) {
		if (err) {
			return next(err);
		} else {
			req.user = user;
			next();
		}
	});
};