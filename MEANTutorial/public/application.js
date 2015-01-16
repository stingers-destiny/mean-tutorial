var mainApplicationModuleName = 'mean';
var mainApplicationModule = angular.module(mainApplicationModuleName, [
		'ngRoute', 'examplemodule', 'appusers' ]);

// To make search engines know that this is SPA so they should wait for results
// (to achieve better SEO)
mainApplicationModule.config([ '$locationProvider',
		function($locationProvider) {
			$locationProvider.hashPrefix('!');
		} ]);

if(window.location.hash === '#_=_')
	window.location.hash = '#!'
		
angular.element(document).ready(function() {
	angular.bootstrap(document, [ mainApplicationModuleName ]);
})