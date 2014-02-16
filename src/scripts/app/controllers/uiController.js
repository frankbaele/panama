define([
  'eventmanager',
  'player'
], function (eventmanager, player) {
    /**
     * Constructor function used by AngularJS to create instances of
     * a service, factory, or controller.
     *
     * @constructor
     */
      ActorController = function($scope, $interval){
        $scope.player = player.getInfo();
        $scope.$watch('player');
        eventmanager.subscribe('new.gamecycle', function(){
          $scope.player = player.getInfo();
          $scope.$apply();
        });

    };

  // Register as global constructor function

  return [ "$scope", "$interval",  ActorController ];
});