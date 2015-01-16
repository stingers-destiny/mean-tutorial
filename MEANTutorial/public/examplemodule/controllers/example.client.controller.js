angular.module('examplemodule').controller('ExampleController', ['$scope', 'Authentication', '$log', function($scope, Authentication, $log) { 
	$scope.name = Authentication.user ? Authentication.user[0].fullName : 'MEAN App';
	}
]);