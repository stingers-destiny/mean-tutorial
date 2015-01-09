exports.render = function(req, res){
	if(req.session.lastVisit){ // Checking if the user ever requested before
		console.log('inside ' + req.session.lastVisit);
	}
	console.log('old ' + req.session.lastVisit);
	req.session.lastVisit = new Date();
	console.log('new ' + req.session.lastVisit);

	
	res.render('index', {title : 'Hello World', userFullName: req.user ? req.user.fullName : ''}); // FIrst argument is name of EJS template (index) and second a 
												  // dictionary of all variables needed by that template
};