module.exports = function(app) {
	var userConstroller = require('../controllers/users.server.controller');
	app.route('/users').post(userConstroller.create).get(userConstroller.list);
	app.route('/users/:userName').get(userConstroller.read).delete(userConstroller.delete);
	app.param('userName', userConstroller.userByUserName);
};