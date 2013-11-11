/**************************************************
 ** GAME MOUSE CLASS
 **************************************************/

var Mouse = function () {
  'use strict';
  var coords;
  function onClick(e) {
    var canvas =  game.getPlayerCanvas();
    coords  = canvas.relMouseCoords(e);
    coords = helper.worldPosToGridPos(coords.x, coords.y);
  }
  return {
    onClick : onClick
  };
};
