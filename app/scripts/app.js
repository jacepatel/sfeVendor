'use strict';


angular
  .module('sfeVendorApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/openshop', {
        templateUrl: 'views/openshop.html',
        controller: 'OpenShopCtrl'

      })
      .when('/currentorders', {
        templateUrl: 'views/currentorders.html',
        controller: 'CurrentOrdersCtrl'

      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  }).run(function($location, $rootScope){
    $rootScope.user = null;
    $rootScope.logOut = function(){
      $rootScope.user = null;
      $location.path('/login');
    };
  });
