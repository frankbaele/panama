define([
  'app/controllers/gameController',
  'app/controllers/uiController',
  'app/controllers/CanvasController',
  'angular-ui-router'
  ], function (gameController, uiController, CanvasController) {

  var app = angular.module('panama', ['ui.router']);

  app.config(function ($stateProvider) {
    //
    // Now set up the states
    $stateProvider
      .state('menu', {
        templateUrl: 'scripts/app/templates/menu.html',
      })
      .state('game', {
        abstract: true,
        templateUrl: "scripts/app/templates/game.html",
        controller: 'gameController'
      })
      .state('game.content', {
        views: {
          'canvas': {
            templateUrl:'scripts/app/templates/game.canvas.html',
            controller: 'canvasController'
          },
          'actor': {
            templateUrl:'scripts/app/templates/game.ui.html',
            controller: 'uiController'
          }
        }
      });
  });
  app.controller('uiController', uiController);
  app.controller('gameController', gameController);
  app.controller('canvasController', CanvasController);
  app.run(['$state', function ($state) {
    $state.transitionTo('menu');
  }]);

  angular.element(document).ready(function () {
    angular.bootstrap(document, ['panama']);
  });
  return app;
});