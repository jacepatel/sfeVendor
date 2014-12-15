"use strict";angular.module("sfeVendorApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap","emguo.poller"]).config(["$routeProvider","$httpProvider",function(a,b){a.when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/openshop",{templateUrl:"views/openshop.html",controller:"OpenShopCtrl"}).when("/currentorders",{templateUrl:"views/currentorders.html",controller:"CurrentOrdersCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/login"}),b.defaults.useXDomain=!0,b.defaults.withCredentials=!0,delete b.defaults.headers.common["X-Requested-With"]}]).run(["$location","$rootScope",function(a,b){b.user=null,b.logOut=function(){b.user=null,a.path("/login")}}]),angular.module("sfeVendorApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("sfeVendorApp").controller("LoginCtrl",["$rootScope","$scope","sfeAPI",function(a,b,c){b.email="",b.loginSubmit=function(){c.authenticate(b.email,b.password)}}]),angular.module("sfeVendorApp").controller("OpenShopCtrl",["$rootScope","$scope","$location","$window","$http","sfeAPI","credStore",function(a,b,c,d,e,f,g){function h(a){j.geocode({latLng:a},function(a,c){c===google.maps.GeocoderStatus.OK?a[1]&&b.$apply(function(){b.inpMapAddress=a[0].formatted_address}):b.$apply(function(){b.inpMapAddress="Unable to find address"})})}function i(a,c){var d=new google.maps.LatLng(a,c),e={center:d,zoom:18},f=new google.maps.Map(document.getElementById("openshop-map"),e),g=new google.maps.Marker({position:d,map:f,title:"You Here Yo!",draggable:!0});h(d);var i=new google.maps.places.Autocomplete(document.getElementById("inpMapAddress"));google.maps.event.addListener(i,"place_changed",function(){b.$apply(function(){var a=i.getPlace();a.geometry&&(f.setCenter(a.geometry.location),g.setPosition(a.geometry.location),b.currentLat=g.getPosition().lat(),b.currentLng=g.getPosition().lng(),model.$setViewValue(document.getElementById("inpMapAddress")))})}),google.maps.event.addListener(g,"dragend",function(){f.setCenter(g.getPosition()),h(g.getPosition()),b.currentLat=g.getPosition().lat(),b.currentLng=g.getPosition().lng()})}b.mytime=new Date,b.mytime.setMinutes(10*Math.round(b.mytime.getMinutes()/10)),b.mytime.setHours(b.mytime.getHours()+3),b.currentLat="",b.currentLng="",b.inpMapAdress="";var j=(g.getCurrentUser(),new google.maps.Geocoder);window.navigator.geolocation.getCurrentPosition(function(a){var c=a.coords;b.currentLat=c.latitude,b.currentLng=c.longitude,i(b.currentLat,b.currentLng)}),f.getMyMenu().success(function(a){b.items=a.items}),b.OpenTheShop=function(){var d=new Date,e=d.getTime(),g=b.mytime.getTime(),h=JSON.stringify({truckId:String(1),startTime:String(e),endTime:String(g),lat:String(b.currentLat).substring(0,12),lng:String(b.currentLng).substring(0,12),locationDirections:String(b.inpCustomAddress),isActive:"true"});f.openMyShop(h).success(function(b){a.trucksession=b,c.path("/currentorders")}).error(function(){})}}]).controller("MenuItemController",["$scope","sfeAPI",function(a,b){a.toggleSelection=function(){a.item.isActive=!a.item.isActive,b.updateMyMenu(a.item)}}]),angular.module("sfeVendorApp").controller("CurrentOrdersCtrl",["$rootScope","$scope","$location","$window","$http","$resource","sfeAPI","$timeout",function(a,b,c,d,e){b.currentOrders=e.get("/dataset/orders.json").success(function(a){b.currentOrders=a.orders})}]).controller("OrderController",["$scope","sfeAPI",function(a,b){a.progressOrder=function(){switch(a.order.orderStatus){case 1:a.order.orderStatus=2;break;case 2:b.progressOrderStatus(a.order.orderId).success(function(b){a.order.errorMessage=b.result,a.order.orderStatus=3,a.orders.splice(a.orders.indexOf(a.order),1)})}}}]),angular.module("sfeVendorApp").factory("sfeAPI",["$http","$location","credStore",function(a,b,c){function d(d,f){var g=e+"/session",h=JSON.stringify({email:d,password:f});a.post(g,h).success(function(a){void 0==a.result?(c.setCurrentUser(a),b.path("/openshop")):alert(a.result)})}var e="http://api.streeteats.com.au";return{authenticate:d,getMyMenu:function(){return a.get("http://api.streeteats.com.au/trucks/1/menu")},updateMyMenu:function(b){var c=JSON.stringify({createdDate:String(b.createdDate),description:b.description,isActive:String(b.isActive),itemId:String(b.itemId),maxQuantity:String(b.maxQuantity),name:String(b.name),price:String(b.price),truckId:String(b.truckId)});return a.post("http://api.streeteats.com.au/items/"+b.itemId,c)},openMyShop:function(b){return a.post("http://api.streeteats.com.au/trucksession",b)},getMyCurrentOrders:function(b){return a.get("http://api.streeteats.com.au/trucksession/"+b+"/activeOrders",{cache:!1})},progressOrderStatus:function(b){return a.get("http://api.streeteats.com.au/orders/updatestatus/"+b,{cache:!1})}}}]),angular.module("sfeVendorApp").factory("credStore",["$http","$location","$rootScope",function(){function a(){return d}function b(a){d=a}function c(){d=null}var d=null;return{getCurrentUser:a,setCurrentUser:b,logOut:c}}]),angular.module("sfeVendorApp").directive("googleplace",function(){return{require:"ngModel",link:function(a,b,c,d){a.gPlace=new google.maps.places.Autocomplete(b[0]),google.maps.event.addListener(a.gPlace,"place_changed",function(){a.$apply(function(){d.$setViewValue(b.val())})})}}});