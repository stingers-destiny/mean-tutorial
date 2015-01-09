angular.module('examplemodule').config(
		[ '$routeProvider', function($routeProvider) {
			$routeProvider.when('/', {
				templateUrl : 'examplemodule/views/example.client.view.html'
			}).otherwise({ // For unknown routes
				redirectTo : '/' // Use the route '/'
			});
		} ]);