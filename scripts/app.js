angular
	.module("marketplace", ["ngMaterial"])
	.config(function($mdThemingProvider) {
		$mdThemingProvider.theme('default')
			.primaryPalette('teal')
			.accentPalette('orange');
	});