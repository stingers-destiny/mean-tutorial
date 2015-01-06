module.exports = function(app){ // The single argument app must be passed the instance of express
	var index = require('../controllers/index.server.controller');
	app.get('/', index.render); // for root GET requests use index.render function
};