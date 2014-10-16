'use strict';

/**
 * @ngdoc function
 * @name sfeVendor.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Login Controller of the sfeVendor
 */
  angular.module('sfeVendorApp')
  .controller('LoginCtrl', function($rootScope, $scope, $http, $location) {
  		$scope.loginSubmit = function(){
  			// var userDetails = JSON.stringify({
  			// 	'email': angular.element('#emailField').val(),
  			// 	'password': angular.element('#passwordField').val()
  			// });

  			// $http.post('/session', userDetails).success(function(data) {
    	// 		$scope.user = data;
  			// });

  			$http.get('dataset/user.json').success(function(data) {
    			$rootScope.user = data;
      			$location.path('/openShop');
  			});
  		};
  });
