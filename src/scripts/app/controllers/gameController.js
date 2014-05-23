define([
  'eventmanager',
  'actor.unit.ai.enemy',
  'actor.unit.ai.friendly',
  'actor.unit.human.local'
], function (eventmanager, enemy, friendly, local) {
  /**
   * Constructor function used by AngularJS to create instances of
   * a service, factory, or controller.
   *
   * @constructor
   */
  gameController = function($scope){
    var frank = new friendly('road.png', {x:5, y:5});
    var test = new friendly('road.png', {x:10, y:10});
  };

  // Register as global constructor function

  return [ "$scope",  gameController ];
});