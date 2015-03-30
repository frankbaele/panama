define(['eventmanager', 'RequestAnimationFrame', 'map', 'actors'], function (eventmanager, RequestAnimationFrame) {
  function animate() {
    eventmanager.publish('new.frame');
    window.setTimeout(animate, 1000/app.config.framerate);
  }
  eventmanager.subscribe('game.init', function(){animate();});
  return {};
});