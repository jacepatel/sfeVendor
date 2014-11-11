'use strict';

/**
 * @ngdoc function
 * @name sfeVendor.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Login Controller of the sfeVendor
 */
  angular.module('sfeVendorApp')
  .controller('LoginCtrl', function($rootScope, $scope, $http, $location, $window) {
  		$scope.loginSubmit = function(){
  			// var userDetails = JSON.stringify({
  			// 	'email': angular.element('#emailField').val(),
  			// 	'password': angular.element('#passwordField').val()
  			// });

  			// $http.post('/session', userDetails).success(function(data) {
    	// 		$scope.user = data;
  			// });

        //Set the User lat and long
        /*
      $window.navigator.geolocation.getCurrentPosition(function(pos){
        $rootScope.lat = pos.coords.latitude;
        $rootScope.lng = pos.coords.longitude;
      });
      */

  			$http.get('dataset/user.json').success(function(data) {
    			$rootScope.user = data;
      			$location.path('/openshop');
  			});
  		};
  });
