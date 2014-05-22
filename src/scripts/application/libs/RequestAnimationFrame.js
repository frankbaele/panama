define([''], function () {
  /**
   * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
   * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
   * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
   * MIT license
   */
  // shim layer with setTimeout fallback
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function(/* function */ callback, /* DOMElement */ element){
        window.setTimeout(callback, 1000 / 16.5);
      };
  })();
});