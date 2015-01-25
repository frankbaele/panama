define(['eventmanager', 'world'], function (eventmanager, world) {
  var terrain = {};
  var actors = {};
  var init = function (){
    terrain.canvas = document.getElementById("mapCanvas");
    terrain.context = terrain.canvas.getContext("2d");

    actors.canvas = document.getElementById("actorsCanvas");
    actors.context = actors.canvas.getContext("2d");

    terrain.canvas.width = world.width * world.tileWidth + world.padding.x * 2;
    terrain.canvas.height = world.height * world.tileHeight + world.padding.y * 2;

    actors.canvas.width = window.innerWidth;
    actors.canvas.height = window.innerHeight;
  };

  eventmanager.subscribe('game.init', function(){init();});
  return {
    terrain: terrain,
    actors: actors
  };
});