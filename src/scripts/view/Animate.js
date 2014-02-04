define(['EventManager', 'RequestAnimationFrame', 'Map', 'Actors'], function (eventManager, RequestAnimationFrame) {
  function animate() {
    eventManager.publish('new.frame');
    window.setTimeout(animate, 1000/20);
  }
  eventManager.subscribe('assets.loaded', function(){animate();});
  return {};
});