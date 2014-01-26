define(['EventManager', 'RequestAnimationFrame', 'Map', 'Actors'], function (eventManager, RequestAnimationFrame) {
  function animate() {
    eventManager.publish('newFrame');
    window.setTimeout(animate, 1000/20);
  }
  eventManager.subscribe('assetsLoaded', function(){animate();});
  return {};
});