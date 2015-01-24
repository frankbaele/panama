define(['eventmanager', 'world'], function (eventmanager, world) {
  var terrain = {};
  var actors = {};
  var init = function (){
    terrain.canvas = document.getElementById("mapCanvas");
    terrain.context = terrain.canvas.getContext("2d");

    actors.canvas = document.getElementById("actorsCanvas");
    actors.context = actors.canvas.getContext("2d");

    terrain.canvas.width = world.width * world.tileWidth;
    terrain.canvas.height = world.height * world.tileHeight;

    actors.canvas.width = window.innerWidth;
    actors.canvas.height = window.innerHeight;
  };

  eventmanager.subscribe('game.init', function(){init();});
  return {
    terrain: terrain,
    actors: actors
  };
});