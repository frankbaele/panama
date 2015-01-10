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
    var frank = new local('tower_13.png', {x:0, y:0});
  };

  // Register as global constructor function

  return [ "$scope",  gameController ];
});
