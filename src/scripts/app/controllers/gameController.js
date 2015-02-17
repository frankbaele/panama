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
    plane({coordinates : {x:30, y:30}}).init();
    plane({coordinates : {x:29, y:30}}).init();
    plane({coordinates : {x:31, y:30}}).init();
    plane({coordinates : {x:30, y:29}}).init();
    plane({coordinates : {x:30, y:31}}).init();
    plane({coordinates : {x:33, y:30}}).init();
    plane({coordinates : {x:29, y:31}}).init();
    plane({coordinates : {x:31, y:31}}).init();
    plane({coordinates : {x:30, y:28}}).init();
    plane({coordinates : {x:30, y:32}}).init();
  };

  // Register as global constructor function

  return [ "$scope", '$timeout',  gameController ];
});
