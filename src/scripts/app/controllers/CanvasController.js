define(['eventmanager'], function (eventmanager) {
  /**
   * Constructor function used by AngularJS to create instances of
   * a service, factory, or controller.
   *
   * @constructor
   */
  canvasController = function( $scope){

    eventmanager.publish('game.init');
  };

  // Register as global constructor function

  return [ "$scope",  canvasController ];
});