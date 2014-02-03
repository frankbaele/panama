define(['actor', 'EventManager', 'Astar', 'World', 'underscore'], function (actor, eventManager, astar, world) {

  function unit(sprite, coordinates) {
    this.coordinates = coordinates;
    this.sprite = sprite;
    var that = this;
    eventManager.publish('ActorCreate', this);

    eventManager.subscribe('leftMouse click', function(e){
      that.checkLeftClick(e);
    });
    eventManager.subscribe('newGameCycle', function(){
      that.move();
    });
  }

  unit.prototype = Object.create(actor.prototype);
  unit.prototype.path = [];
  unit.prototype.generatePath = function() {
    var start = world.graph.nodes[this.coordinates.y][this.coordinates.x];
    var end = world.graph.nodes[this.goal.y][this.goal.x];
    this.path = astar.search(world.graph.nodes, start, end, true);
  }

  unit.prototype.move = function(){
    // If the path is empty do not send move commands
    if (this.path.length !== 0){
      // get the first part of the path
      var first = _.first(this.path);
      this.path = _.rest(this.path);
      this.coordinates = {
        x: first.y,
        y: first.x
      }
      eventManager.publish('command', {event: 'ActorUpdate', parameters:this});
    }
  }

  return unit;
});