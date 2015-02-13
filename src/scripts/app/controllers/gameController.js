define([
  'eventmanager',
  'actor.unit.local'
], function (eventmanager, local) {
  /**
   * Constructor function used by AngularJS to create instances of
   * a service, factory, or controller.
   *
   * @constructor
   */
  gameController = function($scope){
    var player = local({coordinates : {x:30, y:30}});
    player.init();
    var player_2 = local({coordinates : {x:25, y:28}});
    player_2.init();
  };

  // Register as global constructor function

  return [ "$scope",  gameController ];
});
