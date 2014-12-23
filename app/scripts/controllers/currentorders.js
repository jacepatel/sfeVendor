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



    sfeAPI.getMyCurrentOrders($rootScope.trucksession.truckSessionId).success(function(data) {
      var curDate = new Date();
      data.orders.forEach(function (order) {
        var msDuration = Math.abs(curDate - order.orderTime);
        order.duration = parseInt(msDuration / 1000 / 60) + ":" + (msDuration / 1000 % 60).toString().substring(0, 2);

      });

      $scope.currentOrders = data.orders;








    });

    var poll = function() {
      $timeout(function() {
          sfeAPI.getMyCurrentOrders('541').success(function(data) {
            data.orders.forEach(function (order) {
              var curDate = new Date();
              var msDuration = Math.abs(curDate - order.orderTime);
              order.duration = parseInt(msDuration / 1000 / 60) + ":" + (msDuration / 1000 % 60).toString().substring(0, 2);

            });
            $scope.currentOrders = data.orders;
          });
          poll();
      }, 15000);
    };

    poll();


//THE FOLLOWING IS CONTROL FOR THE NG-REPEAT OF THE CURRENT ORDER ITEM
}).controller('OrderController', function( $scope, sfeAPI) {

  //This is called on the ng-click on orders
  $scope.progressOrder = function() {
    switch($scope.order.orderStatus) {
    case 1:
        sfeAPI.progressOrderStatus($scope.order.orderId).success(function(data) {
          $scope.order.errorMessage = data.result;
          //For this, the order has definitely progressed, its just there may be an error msg
          //Come up with a way to display this on the screen.
        });
        $scope.order.orderStatus = 2;
        break;
    case 2:
      sfeAPI.progressOrderStatus($scope.order.orderId).success(function(data) {
        $scope.order.errorMessage = data.result;
        $scope.order.orderStatus = 3;
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
