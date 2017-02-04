myApp.factory('aBreak', function($http) {
  // $http({
  //   method: 'GET',
  //   url: '/api/users/',
  // });
  var getBreak = function(callback) {
    return $http({
      method: 'GET',
      url: '/api/break',
    }).then(function(aBreak) {
      console.log('Here is a break: ', aBreak.data[0]);
      return aBreak.data;
    });
    // , function(response) {
    //   console.log('Services.js - Client could not get break: ', response);
    // });
  };
  return {getBreak: getBreak};
});
