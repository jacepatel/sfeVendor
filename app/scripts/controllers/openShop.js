'use strict';

/**
 * @ngdoc function
 * @name sfeVendorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sfeVendorApp
 */
angular.module('sfeVendorApp')
  .controller('OpenShopCtrl',function($rootScope, $scope, $location, $window, $http, sfeAPI, credStore) {

    //This is the time picker object
    $scope.mytime = new Date();

    var user = credStore.getCurrentUser();

    //Gets the current position of user, then initializes the map
    window.navigator.geolocation.getCurrentPosition(function(pos){
      var crds = pos.coords;
      var lat = crds.latitude;
      var lng = crds.longitude;
      initializeMap(lat, lng);
    });

    //Parses co-ords and updates the input box with current address
    function updateAdress(currentPosition) {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'latLng': currentPosition}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            $scope.$apply(function () {
              $scope.inpMapAddress = results[0].formatted_address;
            });
          }
        } else {
          $scope.$apply(function () {
            $scope.inpMapAddress = 'Unable to find address';
          });
          //write status to the error log
          //alert("Geocoder failed due to: " + status);
        }
      });
    };



    //initiate map
    function initializeMap(lat, lng) {
      var currentLocation = new google.maps.LatLng(lat, lng);

      //map options
      var mapOptions = {
          center: currentLocation,
          zoom: 18
        };

      var map = new google.maps.Map(document.getElementById('openshop-map'), mapOptions);
      //add the final position marker
      var marker = new google.maps.Marker({
          position: currentLocation,
          map: map,
          title:'You Here Yo!',
          draggable:true
      });



      updateAdress(currentLocation);
      //This add a listener to check for drag movements, then updates the address box
      google.maps.event.addListener(marker, 'dragend', function() {
        map.setCenter(marker.getPosition());
        updateAdress(marker.getPosition());
      });
    }
    //Get the menu items
    //YOU NEED TO ADD IN HANDLING FOR THE TRUCK ID
    sfeAPI.getMyMenu().success(function(data) {
      $scope.items = data.items;
    });


    $scope.OpenTheShop = function(){
      //Open a truck session
      //build the open the shop object
      var d = new Date();
      var startTime = d.getTime();
      var closeTime = $scope.mytime.getTime();

      var truckSessionJson = JSON.stringify(
      {
        "truckId": String(1),
        "startTime": String(startTime),
        "endTime": String(closeTime),
        "lat": String(marker.getPosition().lat()),
        "lng": String(marker.getPosition().lng()).substring(0, 10),
        "locationDirections": String($scope.inpCustomAddress),
        "isActive": "true"
      });

      sfeAPI.openMyShop(truckSessionJson).success(function(data) {
        $rootScope.trucksession = data;
      }).error(function(data) {
        //Add some error handling in case of error
      });
    };


//THE FOLLOWING IS CONTROL FOR THE NG-REPEAT OF MENU ITEMS AVAILABLE
}).controller('MenuItemController', function($scope, sfeAPI) {


  //This is called on the ng-click for list items
  $scope.toggleSelection = function() {
    $scope.item.isActive = !$scope.item.isActive;
    //Some error handling required around this maybe, shouldn't have errors though
    sfeAPI.updateMyMenu($scope.item);
  };


});
