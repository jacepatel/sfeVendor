'use strict';

/**
 * @ngdoc function
 * @name sfeVendorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sfeVendorApp
 */
angular.module('sfeVendorApp')
  .controller('CurrentOrdersCtrl',function($rootScope, $scope, $location, $window, $http) {

    //This gets user data, we need this in a service
    var user = $rootScope.user;

    //Get the order items
    $http.get('dataset/orders.json').success(function(data) {
    		$scope.orders = data.orders;
    });

//THE FOLLOWING IS CONTROL FOR THE NG-REPEAT OF THE CURRENT ORDER ITEM
}).controller('OrderController', function( $scope ) {

  //This is called on the ng-click on orders
  $scope.progressOrder = function() {
    switch($scope.order.orderStatus) {
    case 1:
        $scope.order.orderStatus = 2;
        break;
    case 2:
        $scope.order.orderStatus = 3;
        //Complete the order and post to site
        $scope.orders.splice($scope.order, 1);
        break;
    default:
        //Return unknown order error, what the fuck happened
        break;
      }
  };


});
