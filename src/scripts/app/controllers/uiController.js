define([
  'eventmanager'
], function (eventmanager) {
  /**
   * Constructor function used by AngularJS to create instances of
   * a service, factory, or controller.
   *
   * @constructor
   */
  ActorController = function ($scope, $interval) {
    $scope.focus = {};
    eventmanager.subscribe('actor.selected', function(uuid){
      $scope.focus.Uuid = uuid;
      eventmanager.subscribe('actor.object.' + uuid, function(actor){
        $scope.focus.actor = actor;
        $scope.$digest();
      });
      eventmanager.publish('actor.getObject.' + uuid);
    });

    eventmanager.subscribe('actor.unselected', function(uuid){
      if($scope.focus.Uuid === uuid){
        eventmanager.unsubscrive('actor.object.' + uuid, function(actor){
          $scope.focus.actor = actor;
          $scope.$digest();
        });
        $scope.focus.Uuid = '';
        $scope.focus.actor = '';
        $scope.$digest();
      }
    });
  };

  // Register as global constructor function

  return [ "$scope", "$interval", ActorController ];
});