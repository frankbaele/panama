define(['Map', 'RequestAnimationFrame', 'Input'], function (map) {
  function init(){
    map.init();
    animate();
  }
  function animate() {
    map.update();
    // Request a new animation frame using Paul Irish's shim
    window.requestAnimFrame(animate);
  }

  return {
    init: init
  };
});