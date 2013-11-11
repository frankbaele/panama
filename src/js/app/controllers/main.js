angular.module('panama')
  .controller('MainCtrl', function ($scope) {
    $scope.submit = function () {
      console.log('test');
      game.init();
    };
  });
