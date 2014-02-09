define(['EventManager', 'angular', 'angular-ui-router'], function (eventManager, angular) {

  var app = angular.module('panama', ['ui.router']);

  app.config(function ($stateProvider) {
    //
    // Now set up the states
    $stateProvider
      .state('menu', {
        templateUrl: "scripts/view/templates/menu.html"
      })
      .state('game', {
        abstract: true,
        templateUrl: "scripts/view/templates/game.html"

      })
      .state('game.content', {
        views: {
          'canvas': {
            templateUrl:'scripts/view/templates/game.canvas.html',
            controller: function ($scope) {
              eventManager.publish('game.init');
            }
          },
          'actor': {
            templateUrl:'scripts/view/templates/game.actor.html'
          }
        }
      });
  });
  app.run(['$state', function ($state) {
    $state.transitionTo('menu');
  }]);

  angular.element(document).ready(function () {
    angular.bootstrap(document, ['panama']);
  });
  return app;
});