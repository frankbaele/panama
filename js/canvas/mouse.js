/**************************************************
 ** GAME MOUSE CLASS
 **************************************************/

var Mouse = function () {
  'use strict';
  var coords;
  function onClick(e) {
    var canvas =  game.getPlayerCanvas();
    var localPlayer = game.localPlayer();
    var goal = {};
    var visible = game.getVisible();
    coords  = canvas.relMouseCoords(e);
    coords = helper.worldPosToGridPos(coords.x, coords.y);
    console.log(coords);
    localPlayer.setGoal(coords.x, coords.y);
  }
  return {
    onClick : onClick
  };
};
