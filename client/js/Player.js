/**************************************************
 ** GAME PLAYER CLASS
 **************************************************/
var Player = function (startX, startY) {
  var x = startX,
    y = startY,
    id,
    diff = [],
    move,
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

  var update = function (goal) {
    var prevX = x,
      prevY = y;
      diff.x = 0;
      diff.y = 0;

    diff.x = prevX - goal.x
    if(diff.x > 0){
      x -= moveAmount;
    }
    else if(diff.x < 0){
      x += moveAmount;
    }

    diff.y = prevY - goal.y
    if(diff.y > 0){
      y -= moveAmount;
    }
    else if(diff.y < 0){
      y += moveAmount;
    }

    if (diff.y == 0 && diff.x == 0){
      move = false;
    }
    else {
      move = true;
    }
    return move;
  }

  var draw = function (ctx) {
    ctx.fillRect(x - 5, y - 5, 10, 10);
  }

  return {
    getX: getX,
    getY: getY,
    setX: setX,
    setY: setY,
    update: update,
    draw: draw
  }
}