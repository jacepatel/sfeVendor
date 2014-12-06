'use strict';

angular.module('sfeVendorApp').factory('sfeAPI', function($http, $location, credStore) {
  var domain = 'http://api.streeteats.com.au';

    function authenticate(user, pass){
      var url = domain + '/session';
      var credentials = JSON.stringify(
        {
          'email': user,
          'password': pass
        }
      );
      $http.post(url, credentials).
        success(function(data) {
        if (data.result == undefined){
          credStore.setCurrentUser(data);
          $location.path('/openshop');
        }
        else {
          //DO SOMETHING HERE
          alert(data.result);
        }
      });
    }

    return {
    //Define API calls here.....

        authenticate: authenticate,
        getMyMenu: function() {
          return $http.get('http://api.streeteats.com.au/trucks/1/menu');
        },

        updateMyMenu: function(item) {
          var jsonItem = JSON.stringify(
          {
          	"createdDate": String(item.createdDate),
          	"description": item.description,
          	"isActive": String(item.isActive),
          	"itemId": String(item.itemId),
          	"maxQuantity": String(item.maxQuantity),
          	"name": String(item.name),
          	"price": String(item.price),
          	"truckId": String(item.truckId)
          });
          return $http.post('http://api.streeteats.com.au/items/' + item.itemId, jsonItem);
        },

        openMyShop: function(trucksession) {
          $http.post('http://api.streeteats.com.au/trucksession', trucksession);
          return $http.post('http://api.streeteats.com.au/trucksession', trucksession);
        }
  };

});
