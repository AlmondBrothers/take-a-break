// Factory Service
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
      return aBreak.data[0];
    });
    // , function(response) {
    //   console.log('Services.js - Client could not get break: ', response);
    // });
  };

  // Any Controller can get access to these methods
  // NOTE: remember to invoke the following inside
  // controller: (ex: aBreak.getBreak() );
  return {
    getBreak: getBreak,
  };
});

myApp.factory('aUser', function($http) {
  var getUser = function(config, callback) {
    return $http.get('/api/users', {params: {name: 'Marcus'}})
    .then(function(user) {
      console.log(user.data);
    });
  };

  return {
    getUser: getUser,
  };
});
