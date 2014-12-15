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
    $scope.mytime.setMinutes(Math.round($scope.mytime.getMinutes() / 10) * 10);
    $scope.mytime.setHours($scope.mytime.getHours()+3);

    $scope.currentLat = '';
    $scope.currentLng = '';
    //The fucking place to benigga
    //$scope.gPlace = '';
    $scope.inpMapAdress = '';

    var user = credStore.getCurrentUser();
    var geocoder = new google.maps.Geocoder();

    //Gets the current position of user, then initializes the map
    window.navigator.geolocation.getCurrentPosition(function(pos){
      var crds = pos.coords;
      $scope.currentLat = crds.latitude;
      $scope.currentLng = crds.longitude;
      initializeMap($scope.currentLat, $scope.currentLng);
    });

    //Parses co-ords and updates the input box with current address
    function updateAdress(currentPosition) {
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

      var inputLocation = new google.maps.places.Autocomplete(document.getElementById('inpMapAddress'));
      google.maps.event.addListener(inputLocation, 'place_changed', function() {
        $scope.$apply(function() {
          var place = inputLocation.getPlace();
          if (!place.geometry) {
            return;
          }
          else {
            map.setCenter(place.geometry.location);
            marker.setPosition(place.geometry.location);
            $scope.currentLat = marker.getPosition().lat();
            $scope.currentLng = marker.getPosition().lng();
          }
          model.$setViewValue(document.getElementById('inpMapAddress'));
        });
      });

      //This add a listener to check for drag movements, then updates the address box
      google.maps.event.addListener(marker, 'dragend', function() {
        map.setCenter(marker.getPosition());
        updateAdress(marker.getPosition());
        $scope.currentLat = marker.getPosition().lat();
        $scope.currentLng = marker.getPosition().lng();
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
        "lat": String($scope.currentLat).substring(0, 12),
        "lng": String($scope.currentLng).substring(0, 12),
        "locationDirections": String($scope.inpCustomAddress),
        "isActive": "true"
      });

      sfeAPI.openMyShop(truckSessionJson).success(function(data) {
        $rootScope.trucksession = data;
        $location.path('/currentorders');
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
