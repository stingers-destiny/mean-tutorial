angular.module('appusers').factory('Authentication', ['$log', function($log){
	this.user = window.user;
	return { user : this.user }
}]);