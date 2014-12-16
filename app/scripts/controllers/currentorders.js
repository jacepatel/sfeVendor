'use strict';

/**
 * @ngdoc function
 * @name sfeVendorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sfeVendorApp
 */
angular.module('sfeVendorApp')
  .controller('CurrentOrdersCtrl',function($rootScope, $scope, $location, $window, $http, $resource, sfeAPI, $timeout) {

    //This gets user data, we need this in a service
    //var user = $rootScope.user;
    //Get the order items

    //var truckSessionId = $rootScope.trucksession.truckSessionId;



    sfeAPI.getMyCurrentOrders('541').success(function(data) {
      $scope.currentOrders = data.orders;
    });

    var poll = function() {
      $timeout(function() {
          sfeAPI.getMyCurrentOrders('541').success(function(data) {
            $scope.currentOrders = data.orders;
          });
          poll();
      }, 15000);
    };

    poll();


//THE FOLLOWING IS CONTROL FOR THE NG-REPEAT OF THE CURRENT ORDER ITEM
}).controller('OrderController', function( $scope, sfeAPI) {

  //This is called on the ng-click on orders
  $scope.progressOrder = function(idx) {
    switch($scope.order.orderStatus) {
    case 1:
        debugger;
        sfeAPI.progressOrderStatus($scope.order.orderId).success(function(data) {
          $scope.order.errorMessage = data.result;
          debugger;
          //For this, the order has definitely progressed, its just there may be an error msg
          //Come up with a way to display this on the screen.
        });
        $scope.order.orderStatus = 2;
        debugger;
        break;
    case 2:
      sfeAPI.progressOrderStatus($scope.order.orderId).success(function(data) {
        $scope.order.errorMessage = data.result;
        $scope.order.orderStatus = 3;
        $scope.orders.splice(idx, 1);
        //For this, the order has definitely progressed, its just there may be an error msg
        //Come up with a way to display this on the screen.
      });
        break;
    default:
        //
        //Return unknown order error, what the fuck happened
        break;
      }
  };


});
