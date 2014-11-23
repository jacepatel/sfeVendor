 'use strict';

angular.module('sfeVendorApp').factory('credStore', function($http, $location, $rootScope) {
	var authUser = null;
  	function getAuthUser(){
   	 return authUser;
  	}
  	function setAuthUser(user){
  		authUser = user;
  	}
  	function logOut(){
  		authUser = null;
  	}
  	return {
  		getCurrentUser: getAuthUser,
  		setCurrentUser: setAuthUser,
  		logOut: logOut
  	}
});
