process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // Set by default development otherwise 
														      // whatever is set from outside

var mongoose = require('./config/mongoose'); // Make sure this happens before anything else as models are also lo
											  // loaded by this step
var express = require('./config/express');

var db = mongoose();
var app = express();
app.listen(3000);
module.exports = app;
console.log('Server running at http://localhost:3000');
