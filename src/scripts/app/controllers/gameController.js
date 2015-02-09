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
    var player = local({sprite : 'tower_13.png', coordinates : {x:30, y:30}});
    console.log(player);
    var player_2 = local({sprite: 'tower_13.png', coordinates : {x:30, y:30}});
    console.log(player_2);
  };

  // Register as global constructor function

  return [ "$scope",  gameController ];
});
