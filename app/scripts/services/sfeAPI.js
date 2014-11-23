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
          debugger;
          return $http.post('http://api.streeteats.com.au/items/' + item.itemId, item);
        }
  };

});
