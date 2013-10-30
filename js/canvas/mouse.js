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
      var temp = {};
      var goal = {};
      var visible = game.getVisible();
      coords  = canvas.relMouseCoords(e);
      temp.x = helper.roundHalf((coords.x / world.tileWidth) - visible.x / 2);
      temp.y = helper.roundHalf(coords.y / world.tileHeight);

      goal = helper.isoToTwoD(temp);
      console.log(temp.x + ' ' + temp.y);
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
