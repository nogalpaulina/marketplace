(function() {
	
	"use strict";
	
	angular
	.module("marketplace")
	.factory("marketplaceFactory", function($http) {
		
		function getListings() {
			return $http.get('data/listings.json')
		}
		
		return {
			getListings: getListings
		}
	});
})();