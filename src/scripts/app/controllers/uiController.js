define([
  'eventmanager'
], function (eventmanager) {
    /**
     * Constructor function used by AngularJS to create instances of
     * a service, factory, or controller.
     *
     * @constructor
     */
      ActorController = function($scope){

    };

  // Register as global constructor function

  return [ "$scope",  ActorController ];
});