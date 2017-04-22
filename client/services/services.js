// Factory Service
myApp.factory('aBreak', function ($http) {
  const getBreak = () => {
    return $http({
      method: 'GET',
      url: '/api/break',
    }).then(res => res.data[0]);
  };
  return { getBreak };
});
