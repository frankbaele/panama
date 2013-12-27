/**************************************************
 ** GAME KEYBOARD CLASS
 **************************************************/
define([''], function () {
  var up = false,
    left = false,
    right = false,
    down = false,
    space = false;

  function init(){
    window.addEventListener("keydown", onKeyDown, false);
    window.addEventListener("keyup", onKeyUp, false);
    game.keys = keys;
  }

  function onKeyDown(e) {
    switch (e.keyCode) {
      // Controls
      case 37: // Left
        this.left = true;
        break;
      case 38: // Up
        this.up = true;
        break;
      case 39: // Right
        this.right = true; // Will take priority over the left key
        break;
      case 40: // Down
        this.down = true;
        break;
      case 32: // Space
        this.space = true;
        break;
    };
  };

  function onKeyUp(e) {
    switch (e.keyCode) {
      case 37: // Left
        left = false;
        break;
      case 38: // Up
        up = false;
        break;
      case 39: // Right
        right = false;
        break;
      case 40: // Down
        down = false;
        break;
      case 32: // Space
        space = false;
        break;
    };
  };

  function returnLeft (){
    return left;
  }

  init();

  return {
    up: up,
    left: left,
    right: right,
    down: down,
    space: space
  };
});