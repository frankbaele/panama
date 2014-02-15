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
        console.log($scope.player);
        $interval(function (){
          $scope.player = player.getInfo();
        });
    };

  // Register as global constructor function

  return [ "$scope", "$interval",  ActorController ];
});