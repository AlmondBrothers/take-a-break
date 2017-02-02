var myApp = angular.module('myApp', ['ngRoute']);
  
myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider

    .when('/signup', {
      controller: 'signup',
      templateUrl: '/views/signup.html',
    })

    .when('/', {
      controller: 'signin',
      templateUrl: '/views/signin.html',
    })

    .when('/home', {
      controller: 'home',
      templateUrl: '/views/home.html',
    })

    .otherwise({
      redirectTo: '/',
    });
    $locationProvider.hashPrefix('');
});
