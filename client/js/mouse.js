/**************************************************
 ** GAME MOUSE CLASS
 **************************************************/

var Mouse = function () {
  'use strict';
  var coords
  function onClick(e) {


    function getGameData (callback){
      var canvas =  game.canvas();
      var localPlayer = game.localPlayer();
      var goal = [];
      coords  = canvas.relMouseCoords(e);
      goal.x = coords.x.roundTo(3);
      goal.y = coords.y.roundTo(3);

      callback(
        goal,
        localPlayer
      );
    }
    getGameData(function(goal, localPlayer) {
      localPlayer.setGoal(goal);
    });

  }
  return {
    onClick : onClick
  };
};
