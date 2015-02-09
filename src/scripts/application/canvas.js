define(['eventmanager', 'world'], function (eventmanager, world) {
  var terrain = {};
  var init = function (){
    terrain.canvas = document.getElementById("mapCanvas");
    terrain.context = terrain.canvas.getContext("2d");
    terrain.canvas.width = world.width * world.tileWidth + world.padding.x * 2;
    terrain.canvas.height = world.height * world.tileHeight + world.padding.y * 2;
  };

  eventmanager.subscribe('game.init', function(){init();});
  return {
    terrain: terrain
  };
});