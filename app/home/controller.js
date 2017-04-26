app.controller('home', function ($scope, $location, aBreak) {
  $scope.break = {};
  $scope.physicalBreaks = { Yes: 0, No: 0 };
  $scope.mentalBreaks = { Yes: 0, No: 0 };
  $scope.chart;

  const getABreak = () => {
    aBreak.getBreak().then(res => {
      $scope.break.type = res.type;
      $scope.break.title = res.title;
      $scope.break.description = res.description;
    });
    $scope.chart = [$scope.physicalBreaks.Yes, $scope.physicalBreaks.No + $scope.mentalBreaks.No, $scope.mentalBreaks.Yes];
  };

  $scope.percent = (a, b) => Math.round(a / (a + b) * 100);

  getABreak();

  $scope.completedBreak = () => {
    $scope.break.type === 'Physical' ? $scope.physicalBreaks.Yes++ : $scope.mentalBreaks.Yes++;
    getABreak();
  };

  $scope.skippedBreak = () => {
    $scope.break.type === 'Physical' ? $scope.physicalBreaks.No++ : $scope.mentalBreaks.No++;
    getABreak();
  };
});
