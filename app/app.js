const app = angular.module('app', ['ngRoute']);
app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/home', {
    controller: 'home',
    templateUrl: '/home/view.html',
    reloadOnSearch: false,
  })
  .when('/', {
    templateUrl: '/signin/view.html',
    reloadOnSearch: false,
  })
  .otherwise({
    redirectTo: '/',
  });
  $locationProvider.html5Mode(true);
});
