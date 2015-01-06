// expres.js is the file where we bootstrap and configure our express object
var config = require('./config');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var compression = require('compression');
var methodOverride = require('method-override');
var session = require('express-session');

module.exports = function(){
	var app = express();
	
	// Configure express
	if (process.env.NODE_ENV === 'development'){
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production'){
		app.use(compression());
	}
	
	app.use(bodyParser.urlencoded({
		extended : true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());
	
	// Setting the session middleware
	app.use(session({
		saveUninitialized : true,
		resave : true,
		secret : config.sessionSecret
	}));
	
	// Setting view rendering for express
	app.set('views', './app/views');
	app.set('view engine', 'ejs');
	
	// Init route
	require('../app/routes/index.server.routes.js')(app);
	
	// Adding static pages middleware. Must be done after route so as to not waste IO during req processing
	app.use(express.static('./public'));
	return app;
}