process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // Set by default development otherwise 
														      // whatever is set from outside

var mongoose = require('./config/mongoose')(); // Must be loaded first to ensure models are available
var express = require('./config/express')();
var passport = require('./config/passport')();

express.listen(3000);
module.exports = express;
console.log('Server running at http://localhost:3000');
