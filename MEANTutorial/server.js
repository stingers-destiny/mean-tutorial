process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // Set by default development otherwise 
														      // whatever is set from outside

var express = require('./config/express.js');

var app = express();
app.listen(3000);
module.exports = app;
console.log('Server running at http://localhost:3000');
