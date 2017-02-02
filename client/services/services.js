myApp.factory('signin', function($http) {
  $http({
    method: 'GET',
    url: '/api/users/',
  });
})