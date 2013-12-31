define(['EventManager', 'RequestAnimationFrame', 'Map', 'Actors'], function (eventManager) {
  function animate() {
    eventManager.publish('updateMap');
    eventManager.publish('updateActors');
    // Request a new animation frame using Paul Irish's shim
    window.requestAnimFrame(animate);
  }
  eventManager.subscribe('assetsLoaded', function(){animate();});
  return {};
});