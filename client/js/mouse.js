/**************************************************
 ** GAME MOUSE CLASS
 **************************************************/

var Mouse = function () {
  'use strict';
  var coords

  function onClick(e) {
    var canvas =  game.canvas();
    var localPlayer = game.localPlayer();
    var goal = [];

    coords  = canvas.relMouseCoords(e);
    goal.x = coords.x.roundTo(3);
    goal.y = coords.y.roundTo(3);
    localPlayer.setGoal(goal);
  }
  return {
    onClick : onClick
  };
};
