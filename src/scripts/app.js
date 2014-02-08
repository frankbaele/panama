define(['EventManager','angular'], function (eventManager, angular) {

  var app = angular.module('panama', []);

  app.controller('test', function($scope){
    $scope.test = 'nanana';
  });

  angular.element(document).ready(function () {
    angular.bootstrap(document, ['panama']);
  });
  /*
  eventManager.subscribe('assets.loaded', function() {
    eventManager.publish('game.init');
  }
  );
  */
  return app;
});