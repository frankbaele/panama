angular.module('panama')
  .controller('MainCtrl', function ($scope) {
    $scope.submit = function () {
      game.init();
    };
  });
