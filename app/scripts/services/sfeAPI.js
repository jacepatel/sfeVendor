'use strict';

angular.module('sfeVendorApp').factory('sfeAPI', function($http, $location, credStore) {
  var domain = 'https://evening-scrubland-5159.herokuapp.com';

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

          //Remember you need to change the vendor id in the path here
          //truckId
          return $http.get('https://evening-scrubland-5159.herokuapp.com/trucks/1/menu');
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
          return $http.post('hhttps://evening-scrubland-5159.herokuapp.com/items/' + item.itemId, jsonItem);
        },

        openMyShop: function(trucksession) {
          return $http.post('https://evening-scrubland-5159.herokuapp.com/trucksession', trucksession);
        },

        getMyCurrentOrders: function(truckSessionId) {
          ///trucksession/:truckSessionId/activeOrders
          return $http.get('https://evening-scrubland-5159.herokuapp.com/trucksession/'+ truckSessionId +'/activeOrders', {cache:false});
        },
        progressOrderStatus: function(orderId) {
          return $http.get('https://evening-scrubland-5159.herokuapp.com/updatestatus/'+ orderId, {cache:false});
        }

  };

});
