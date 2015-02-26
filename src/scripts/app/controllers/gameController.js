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
    //plane({coordinates : {x:30, y:30}}).init();
  };

  // Register as global constructor function

  return [ "$scope", '$timeout',  gameController ];
});
