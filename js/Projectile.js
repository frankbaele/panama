/**************************************************
 ** Projectile CLASS
 **************************************************/
var Projectile = function (startX, startY, keys) {
  var x = startX,
    y = startY,
    left = keys.left,
    right = keys.right,
    up = keys.up,
    down = keys.down,
    moveAmount = 4;
  var getX = function () {
    return x;
  }

  var getY = function () {
    return y;
  }

  var setX = function (newX) {
    x = newX;
  }

  var setY = function (newY) {
    y = newY;
  }
  var update = function () {
      var prevX = x,
        prevY = y;
      // Up key takes priority over down
      if (up) {
        y -= moveAmount;
      } else if (down) {
        y += moveAmount;
      }

      // Left key takes priority over right
      if (left) {
        x -= moveAmount;
      } else if (right) {
        x += moveAmount;
      }
      return (prevX != x || prevY != y) ? true : false;
  }

  var draw = function (ctx) {
    ctx.fillRect(x - 1, y - 1, 2, 2);
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