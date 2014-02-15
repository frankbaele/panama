define(['eventmanager', 'RequestAnimationFrame', 'map', 'actors'], function (eventmanager, RequestAnimationFrame) {
  function animate() {
    eventmanager.publish('new.frame');
    window.setTimeout(animate, 1000/20);
  }
  eventmanager.subscribe('game.init', function(){animate();});
  return {};
});