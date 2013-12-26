define(['Map', 'RequestAnimationFrame'], function (map) {
  var redrawMap = true;
  function animate() {
    map.move();
    draw();
    // Request a new animation frame using Paul Irish's shim
    window.requestAnimFrame(animate);
  }

  function draw() {
    // Only update the map canvas if a map update is requested by the game
    if (redrawMap) {
      map.draw();
      redrawMap = false;
    }
  }

  return {
    init: animate
  };
});