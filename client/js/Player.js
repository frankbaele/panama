/**************************************************
 ** GAME PLAYER CLASS
 **************************************************/
var Player = function (startGridPosition) {
  "use strict";
  var gridPosition = startGridPosition,
    goal = startGridPosition,
    diff = [],
    move = false,
    id,
    moveAmount = 3;

  var getGridPosition = function () {
    return gridPosition;
  };

  var setGridPosition = function (newGridPosition) {
    gridPosition = newGridPosition;
  };

  var setGoal = function (goal) {
    console.log('click');
    move = true;
  };

  var getMove = function () {
    return move;
  };

  var update = function () {

  };

  var draw = function (ctx) {

  };

  return {
    getGridPosition : getGridPosition,
    setGridPosition : setGridPosition,
    getMove : getMove,
    update : update,
    draw : draw,
    setGoal : setGoal,
    move : move
  };
};