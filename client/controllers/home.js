myApp.controller('home', function($scope, $location, aBreak) {
  $scope.break = {};
  $scope.physicalBreakCount = {Yes: 0, No: 0};
  $scope.mentalBreakCount = {Yes: 0, No: 0};
  $scope.physicalPercent = {Yes: 0, No: 0};
  $scope.mentalPercent = {Yes: 0, No: 0};
  $scope.physicalPercentString = $scope.physicalPercent.Yes;
  $scope.mentalPercentString = $scope.mentalPercent.Yes;

  // console.log(aBreak.getBreak());
    // Promise - so that getBreak() finishes retrieving 'aBreak'
  var getABreak = function() {
    // want to set a break every # of minutes
    // setTimeout(function() {
    //   getABreak();
    //   // mins * secs * millisecs
    // }, 1 * 10 * 1000);
    // Need a promise, so getBreak() executes fully
    // Ensures $scope variables obtain 'data' from getBreak()
    aBreak.getBreak().then(function(someBreak) {
      console.log('Home.js - Get a Break: ', someBreak);
      $scope.break.type = someBreak.type;
      $scope.break.title = someBreak.title;
      $scope.break.description = someBreak.description;
    });
  };
  getABreak();

  // var getAUser = function() {
  //   $location.search('name', 'Marcus');
  //   aUser.getUser().then(function(someUser) {
  //     console.log('Home.js - Get a user:', someUser);
  //   });
  // };
  // getAUser();

  $scope.completeBreak = function(breakType) {
    breakType = $scope.break.type;
    console.log('Type of Break is: ', breakType);
    if (breakType === 'Physical') {
      $scope.physicalBreakCount.Yes++;

      $scope.physicalPercent.Yes =
      Math.round(($scope.physicalBreakCount.Yes / ($scope.physicalBreakCount.Yes +
        $scope.physicalBreakCount.No)) * 100);

      $scope.physicalPercent.No = 100 - $scope.physicalPercent.Yes;
      document.getElementById("physical-yes").style.width = $scope.physicalPercent.Yes.toString() + '%';
      document.getElementById("physical-no").style.width = $scope.physicalPercent.No.toString() + '%';
      getABreak();
    } else {
      $scope.mentalBreakCount.Yes++;
      $scope.mentalPercent.Yes =

      Math.round(($scope.mentalBreakCount.Yes / ($scope.mentalBreakCount.Yes +
        $scope.mentalBreakCount.No)) * 100);

      $scope.mentalPercent.No = 100 - $scope.mentalPercent.Yes;
      document.getElementById("mental-yes").style.width = $scope.mentalPercent.Yes.toString() + '%';
      document.getElementById("mental-no").style.width = $scope.mentalPercent.No.toString() + '%';
      getABreak();
    }
  };

  $scope.notCompleteBreak = function(breakType) {
    breakType = $scope.break.type;
    if (breakType === 'Physical') {
      $scope.physicalBreakCount.No++;

       $scope.physicalPercent.No =
      Math.round(($scope.physicalBreakCount.No / ($scope.physicalBreakCount.Yes +
        $scope.physicalBreakCount.No)) * 100);

      $scope.physicalPercent.Yes = 100 - $scope.physicalPercent.No;
      document.getElementById("physical-yes").style.width = $scope.physicalPercent.Yes.toString() + '%';
      document.getElementById("physical-no").style.width = $scope.physicalPercent.No.toString() + '%';
      getABreak();
    } else {
      $scope.mentalBreakCount.No++;
       $scope.mentalPercent.No =

      Math.round(($scope.mentalBreakCount.No / ($scope.mentalBreakCount.Yes +
        $scope.mentalBreakCount.No)) * 100);

      $scope.mentalPercent.Yes = 100 - $scope.mentalPercent.No;
      document.getElementById("mental-yes").style.width = $scope.mentalPercent.Yes.toString() + '%';
      document.getElementById("mental-no").style.width = $scope.mentalPercent.No.toString() + '%';
      getABreak();
    }
  };

});
