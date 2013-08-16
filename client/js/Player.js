/**************************************************
 ** GAME PLAYER CLASS
 **************************************************/
var Player = function (startX, startY) {
  "use strict";
  var x = startX,
    y = startY,
    goalY = startY,
    goalX = startX,
    id,
    diff = [],
    move = false,
    moveAmount = 3;

  var getX = function () {
    return x;
  };

  var getY = function () {
    return y;
  };

  var setX = function (newX) {
    x = newX;
  };

  var setY = function (newY) {
    y = newY;
  };

  var setGoal = function (goal) {
    goalX = goal.x;
    goalY = goal.y;
    move = true;
  };

  var getMove = function () {
    return move;
  };

  var update = function () {
    var prevX = x,
      prevY = y;
      diff.x = 0;
      diff.y = 0;
    diff.x = prevX - goalX;
    if(diff.x > 0){
      x -= moveAmount;
    }
    else if(diff.x < 0){
      x += moveAmount;
    }

    diff.y = prevY - goalY;
    if(diff.y > 0) {
      y -= moveAmount;
    }
    else if(diff.y < 0) {
      y += moveAmount;
    }
    if (diff.y === 0 && diff.x === 0) {
      move = false;
    }
  };

  var draw = function (ctx) {
    ctx.fillRect(x - 5, y - 5, 10, 10);
  };

  return {
    getX: getX,
    getY: getY,
    setX: setX,
    setY: setY,
    getMove: getMove,
    update: update,
    draw: draw,
    setGoal: setGoal,
    move: move
  };
};