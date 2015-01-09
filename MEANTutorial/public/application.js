var mainApplicationModuleName = 'mean';
var exampleModuleName = 'examplemodule';
var mainApplicationModule = angular.module(mainApplicationModuleName, [
		exampleModuleName ]);

// To make search engines know that this is SPA so they should wait for results
// (to achieve better SEO)
mainApplicationModule.config([ '$locationProvider',
		function($locationProvider) {
			$locationProvider.hashPrefix('!');
		} ]);

angular.element(document).ready(function() {
	console.log('In angular.element');
	angular.bootstrap(document, [ mainApplicationModuleName ]);
})