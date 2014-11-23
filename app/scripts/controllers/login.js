'use strict';

/**
 * @ngdoc function
 * @name sfeVendor.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Login Controller of the sfeVendor
 */
  angular.module('sfeVendorApp')
  .controller('LoginCtrl', function($rootScope, $scope, sfeAPI) {
      $scope.email = '';
      $scope.password = '';
  		$scope.loginSubmit = function(){
  			sfeAPI.authenticate($scope.email, $scope.password);
  		};
  });
