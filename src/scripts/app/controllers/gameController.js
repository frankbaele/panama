define([
  'eventmanager',
  'actor.unit.human.local'
], function (eventmanager, human) {
  /**
   * Constructor function used by AngularJS to create instances of
   * a service, factory, or controller.
   *
   * @constructor
   */
  gameController = function($scope){
    var frank = new human('ally.png', {x:5, y:5});
  };

  // Register as global constructor function

  return [ "$scope",  gameController ];
});