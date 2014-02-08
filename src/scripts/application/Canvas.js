define(['EventManager', 'World'], function (eventManager, world) {
  var terrain = {};
  var player = {};
  var init = function (){
    terrain.canvas = document.getElementById("mapCanvas");
    terrain.context = terrain.canvas.getContext("2d");

    player.canvas = document.getElementById("playerCanvas");
    player.context = player.canvas.getContext("2d");

    terrain.canvas.width = world.width * world.tileWidth;
    terrain.canvas.height = world.height * world.tileHeight;

    player.canvas.width = world.width * world.tileWidth;
    player.canvas.height = world.height * world.tileHeight;
  };

  eventManager.subscribe('game.init', function(){init();});
  return {
    terrain: terrain,
    player: player
  };
});