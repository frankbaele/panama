define([
  'scripts/app/controllers/uiController',
  'scripts/app/controllers/gameController',
  'scripts/app/controllers/CanvasController',
  'angular',
  'angular-ui-router',
  'gamecycle', 'assets', 'animate', 'input','player'
  ], function (uiController, gameController, CanvasController) {

  var app = angular.module('panama', ['ui.router']);

  app.config(function ($stateProvider) {
    //
    // Now set up the states
    $stateProvider
      .state('menu', {
        templateUrl: 'templates/menu.html',
      })
      .state('game', {
        abstract: true,
        templateUrl: "templates/game.html",
        controller: 'gameController'
      })
      .state('game.content', {
        views: {
          'canvas': {
            templateUrl:'templates/game.canvas.html',
            controller: 'canvasController'
          },
          'actor': {
            templateUrl:'templates/game.ui.html',
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