module.exports = function(app) {
	var userConstroller = require('../controllers/users.server.controller');
	var passport = require('passport');
	
	app.route('/users').post(userConstroller.create).get(userConstroller.list);
	app.route('/users/:userName').get(userConstroller.read).delete(userConstroller.delete);
	app.param('userName', userConstroller.userByUserName);
	
	app.route('/signup').get(userConstroller.renderSignup).post(userConstroller.signup);
	app.route('/signin').get(userConstroller.renderSignin).post(passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect:'/signup',
		failureFlash:true
	}));
};