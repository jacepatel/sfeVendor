'use strict';


angular
  .module('sfeVendorApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider, $httpProvider) {
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
      $httpProvider.defaults.useXDomain = true;
      $httpProvider.defaults.withCredentials = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
  })
  .run(function($location, $rootScope){
    $rootScope.user = null;
    $rootScope.logOut = function(){
      $rootScope.user = null;
      $location.path('/login');
    };
  });
