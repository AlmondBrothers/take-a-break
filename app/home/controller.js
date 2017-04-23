app.controller('home', function ($scope, $location, aBreak) {
  $scope.break = {};
  $scope.physicalBreaks = { Yes: 0, No: 0 };
  $scope.mentalBreaks = { Yes: 0, No: 0 };

  const getABreak = () => {
    aBreak.getBreak().then(res => {
      $scope.break.type = res.type;
      $scope.break.title = res.title;
      $scope.break.description = res.description;
    });
  };

  $scope.percent = (a, b) => Math.round(a / (a + b) * 100);

  getABreak();

  $scope.completedBreak = () => {
    const breakType = $scope.break.type;
    if (breakType === 'Physical') {
      $scope.physicalBreaks.Yes++;
      return getABreak();
    } 
    $scope.mentalBreaks.Yes++;
    getABreak();
  };

  $scope.skippedBreak = () => {
    const breakType = $scope.break.type;
    if (breakType === 'Physical') {
      $scope.physicalBreaks.No++;
      return getABreak();
    } 
    $scope.mentalBreaks.No++;
    getABreak();
  };
});
