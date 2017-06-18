(function() {
		"use strict";
	
	angular
		.module("marketplace")
		.controller("marketplaceController", function($scope, marketplaceFactory, $mdSidenav, $mdToast, $mdDialog) {
			
			marketplaceFactory.getListings().then(function(listings) {
				
				$scope.listings = listings.data;
				$scope.categories = getCategories($scope.listings);
			});
			
			$scope.showContact = false;
			$scope.showAdmin = false;
			$scope.lockSideNav = false;
		
			$scope.openSidebar = function() {
				$scope.lockSideNav = true;
				$mdSidenav('left').open();
			}
			
			$scope.closeSidebar = function() {
				$scope.editing = false;
				$scope.lockSideNav = false;
				$mdSidenav('left').close();
				$scope.listing = {};
			}
			
			$scope.saveListing = function(listing){
				if(listing) {
					listing.contact = contact;
					$scope.listings.push(listing);
					$scope.closeSidebar();
					$scope.listing = {};
					showToast("New Listing Added!");
				}
			}
			
			$scope.editListing = function(listing) {
				$scope.editing = true;
				$scope.openSidebar();
				$scope.listing = listing;
			}
			
			$scope.saveEdit = function() {
				$scope.closeSidebar();
				showToast("Edit Saved");
			}
			
			$scope.deleteListing = function(event, listing) {
				var confirm = $mdDialog.confirm()
					.title("Would you really like to delete '" +  listing.title + "'?")
					.ok("Yes, please")
					.cancel("No")
					.targetEvent(event);
				
				$mdDialog.show(confirm).then(function() {
					var index = $scope.listings.indexOf(listing);
					$scope.listings.splice(index, 1);
				})
			}
			
			// Helper functions
			
			var getCategories = function(listings) {
				return _.uniq(_.flatten(_.map(listings, function(item) {
					return _.map(item.categories, function(category) {
						return category;
					});
				})));
			}
		
			var contact = {
				name: "John Doe",
				phone: "(555) 123-2052",
				email: "johndoe@gmail.com"
			}
			
			function showToast(message) {
					$mdToast.show(
						$mdToast.simple()
						.content(message)
						.position("top right")
						.hideDelay(3000)
					)
			}
		});
})();