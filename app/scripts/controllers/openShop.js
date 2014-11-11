'use strict';

/**
 * @ngdoc function
 * @name sfeVendorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sfeVendorApp
 */
angular.module('sfeVendorApp')
  .controller('OpenShopCtrl',function($rootScope, $scope, $location, $window, $http) {

    //Get Co-Ords and call initialize map

    //This gets user data, we need this in a service
    var user = $rootScope.user;

    //Sets the current location from the user update at login
    var currentLocation = new google.maps.LatLng(user.currentLat, user.currentLong);

    //map options
    var mapOptions = {
        center: currentLocation,
        zoom: 12
      };

    //initiate map
    var map = new google.maps.Map(document.getElementById('openshop-map'), mapOptions);

    //geocoder to get address information from location
    var geocoder = new google.maps.Geocoder();
    //add the final position marker
    var marker = new google.maps.Marker({
        position: currentLocation,
        map: map,
        title:'You Here Yo!',
        draggable:true
    });

    //This add a listener to check for drag movements, then updates the address box
      google.maps.event.addListener(marker, 'dragend', function() {
        map.setCenter(marker.getPosition());
        geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              angular.element('#inpMapAddress').val(results[0].formatted_address);
            }
          } else {
            angular.element('#inpMapAddress').val('Unable to find address');
            //write status to the error log
            //alert("Geocoder failed due to: " + status);
          }
        });
      });

      //The address elemnts on the page
      // angular.element('#inpMapAddress').val();
      // angular.element('#inpCustomAddress').val();

      //get the address populated
      //Open the shop action

    //Get the menu items
    $http.get('dataset/items.json').success(function(data) {
    		$scope.items = data.items;
    });


    $scope.OpenTheShop = function(){
      //Set the shop to open with the variables set
    };
//THE FOLLOWING IS CONTROL FOR THE NG-REPEAT OF MENU ITEMS AVAILABLE
}).controller('MenuItemController', function( $scope ) {


  //This is called on the ng-click for list items
  $scope.toggleSelection = function() {
    $scope.item.isActive = !$scope.item.isActive;
  };


});
