var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      controller: 'home',
      templateUrl: '/views/home.html',
      reloadOnSearch: false,
    })
    .otherwise({
      redirectTo: '/',
    });
    $locationProvider.hashPrefix('');
});
