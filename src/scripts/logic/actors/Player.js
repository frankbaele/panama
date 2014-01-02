define(['Actor', 'EventManager', 'Astar', 'World'], function (actor, eventManager, astar, world) {

  function Player() {
    var sprite,
      guid,
      coordinates,
      selected,
      guid,
      path = [],
      that = this;
    eventManager.subscribe('leftMouse click', function(e){
      that.checkLeftClick(e);
    });
    eventManager.subscribe('rightMouse click', function(e){
      that.checkRightClick(e);
    });
    eventManager.subscribe('newGameCycle', function(){
      that.move();
    });
  }
  Player.prototype = new actor;
  Player.prototype.checkRightClick = function(e) {
    var start = world.graph.nodes[this.coordinates.y][this.coordinates.x];
    var end = world.graph.nodes[e.y][e.x];
    this.path = astar.search(world.graph.nodes, start, end, true);
  }
  Player.prototype.move = function(){
    console.log('test');
  }
  return Player;
});