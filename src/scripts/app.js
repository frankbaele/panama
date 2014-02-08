define(['EventManager','angular', 'angular-ui-router'], function (eventManager, angular) {

  var app = angular.module('panama', ['ui.router']);

  app.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/menu");
    //
    // Now set up the states
    $stateProvider
      .state('menu', {
        url: "/menu",
        templateUrl: "scripts/view/templates/menu.html"
      })
      .state('canvas', {
        url: "/game",
        templateUrl: "scripts/view/templates/canvas.html",
        controller: function($scope) {
          eventManager.publish('game.init');
        }
      });

  });

  angular.element(document).ready(function () {
    angular.bootstrap(document, ['panama']);
  });
  /*

  );
  */
  return app;
});