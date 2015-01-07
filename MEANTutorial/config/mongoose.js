var config = require('./config');
var mongoose = require('mongoose');

module.exports = function(){
	var db = mongoose.connect(config.db_uri);
	
	// Register the models with mongoose needs to deal with
	require('../app/models/user.server.model');
	return db;
}