var User = require('mongoose').model('User');

var getErrorMessage = function(err) { 
	var message = ''; 
	if (err.code) { 
		switch (err.code){ 
			case 11000: 
			case 11001: 
				message = 'Username already exists'; 
				break;
			default: message = 'Something went wrong'; 
		} 
	} else { 
		for (var errName in err.errors){ 
			if (err.errors[errName].message)
				message = err.errors[errName].message; 
		} 
	} 
	return message; 
};

exports.saveOAuthUserProfile = function(req, profile, done) {
    User.findOne({
        provider: profile.provider,
        providerId: profile.providerId
    }, function(err, user) {
        if (err) {
            return done(err);
        } else {
            if (!user) {
                var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');
                User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
                    profile.username = availableUsername;
                    user = new User(profile);
                    user.save(function(err) {
                        if (err) {
                            var message = _this.getErrorMessage(err);
                            req.flash('error', message);
                            return res.redirect('/signup');
                        }
                        return done(err, user);
                    });
                });
            } else {
                return done(err, user);
            }
        }
    });
};

exports.renderSignin = function(req, res, next) {
    if (!req.user) {
        res.render('signin', {
            title: 'Sign-in Form',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};

exports.signup = function(req, res, next) {
    if (!req.user) {
        var user = new User(req.body);
        var message = null;
        user.provider = 'local';
        user.save(function(err) {
            if (err) {
                var message = getErrorMessage(err);
                req.flash('error', message);
                return res.redirect('/signup');
            }
            req.login(user, function(err) {
                if (err) return next(err);
                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/');
    }
};
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

exports.renderSignup = function(req, res, next) {
    if (!req.user) {
        res.render('signup', {
            title: 'Sign-up Form',
            messages: req.flash('error')
        });
    } else {
        return res.redirect('/');
    }
};

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


exports.delete = function(req, resp, next) {
	req.user.remove(function(err) {
		if (err) {
			return next(err);
		} else {
			resp.json(req.user);
		}
	});
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
