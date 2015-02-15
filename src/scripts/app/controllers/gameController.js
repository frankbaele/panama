define([
  'eventmanager',
  'plane'
], function (eventmanager, plane) {
  /**
   * Constructor function used by AngularJS to create instances of
   * a service, factory, or controller.
   *
   * @constructor
   */
  gameController = function($scope, $timeout){
    var player = plane({coordinates : {x:30, y:30}});
    player.init();
  };

  // Register as global constructor function

  return [ "$scope", '$timeout',  gameController ];
});
