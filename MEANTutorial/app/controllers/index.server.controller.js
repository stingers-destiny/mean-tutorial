exports.render = function(req, res){
	console.log('user is ' + JSON.stringify(req.user));
	res.render('index', {
		title : 'Hello World', 
		user: JSON.stringify(req.user)}); // FIrst argument is name of EJS template (index) and second a 
												  // dictionary of all variables needed by that template
};
