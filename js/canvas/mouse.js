/**************************************************
 ** GAME MOUSE CLASS
 **************************************************/

var Mouse = function () {
  'use strict';
  var coords;
  function onClick(e) {

    function getGameData(callback) {
      var canvas =  game.getPlayerCanvas();
      var localPlayer = game.localPlayer();
      var unoTile = game.getUnoTile();
      var goal = {};
      var visible = game.getVisible();
      coords  = canvas.relMouseCoords(e);
      coords = helper.worldPosToGridPos(coords.x, coords.y);
      goal = helper.isoToTwoD(temp);
      helper.drawSprite("sand.png", goal.x + unoTile.x, goal.y + unoTile.y, "map");
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
