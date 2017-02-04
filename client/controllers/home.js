myApp.controller('home', function($scope, aBreak) {
  $scope.break = {};
  // console.log(aBreak.getBreak());
    // Promise - so that getBreak() finishes retrieving 'aBreak'
  var getABreak = function() {
    // want to set a break every # of minutes
    setTimeout(function() {
      getABreak();
      // mins * secs * millisecs
    }, 1 * 60 * 1000);
    // Need a promise, so getBreak() executes fully
    // Ensures $scope variables obtain 'data' from getBreak()
    aBreak.getBreak().then(function(someBreak) {
      console.log('Home.js - Get a Break: ', someBreak);
      $scope.break.title = someBreak.title;
      $scope.break.description = someBreak.description;
    });
  };
  getABreak();
});
