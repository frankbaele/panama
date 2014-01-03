define(['Actor', 'EventManager', 'Astar', 'World', 'underscore'], function (actor, eventManager, astar, world) {

  function Player() {
    var that = this;
    that.path = [];
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

  Player.prototype = actor.prototype;

  Player.prototype.checkRightClick = function(e) {
    this.goal = e;
    this.generatePath();
  }

  Player.prototype.generatePath = function() {
    var start = world.graph.nodes[this.coordinates.y][this.coordinates.x];
    var end = world.graph.nodes[this.goal.y][this.goal.x];
    this.path = astar.search(world.graph.nodes, start, end, true);
  }

  Player.prototype.move = function(){
    // If the path is empty do not send move commands
    if (this.path.length !== 0){
      // get the first part of the path
      var first = _.first(this.path);
      this.path = _.rest(this.path);
      this.coordinates = {
        x: first.y,
        y: first.x
      }
      eventManager.publish('ActorUpdate', this)
    }
  }

  return Player;
});