// Factory Service
myApp.factory('aBreak', function($http) {
  var getBreak = function(callback) {
    return $http({
      method: 'GET',
      url: '/api/break',
    }).then(function(aBreak) {
      console.log('Here is a break: ', aBreak.data[0]);
      return aBreak.data[0];
    });
  };

  return {
    getBreak: getBreak,
  };
});
