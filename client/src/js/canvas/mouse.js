/**************************************************
 ** GAME MOUSE CLASS
 **************************************************/

var Mouse = function () {
  'use strict';
  var coords;
  function onClick(e) {

    function getGameData(callback) {
      var canvas =  game.getPlayerCanvas;
      var localPlayer = game.localPlayer();
      var goal = [];
      coords  = canvas.relMouseCoords(e);
      goal.x = coords.x;
      goal.y = coords.y;
      alert(goal.x);

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
