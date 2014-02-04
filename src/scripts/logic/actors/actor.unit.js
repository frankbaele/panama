define(['actor', 'EventManager', 'Astar', 'World', 'underscore'], function (actor, eventManager, astar, world) {

  function unit(sprite, coordinates) {
    _.extend(this, new actor(sprite, coordinates));
    this.path = [];
    this.focus = '';
    this.strenght = 0;
    this.dexterity = 0;
    this.intelligence = 0;
    this.health = 0;
    // temp vars
    this.attack = 10;
  }
  unit.prototype = Object.create(actor.prototype);

  unit.prototype.generatePath = function() {
    var start = world.graph.nodes[this.coordinates.y][this.coordinates.x];
    var end = world.graph.nodes[this.goal.y][this.goal.x];
    this.path = astar.search(world.graph.nodes, start, end, true);
  };

  unit.prototype.move = function(){
    // If the path is empty do not send move commands
    if (this.path.length !== 0){
      // get the first part of the path
      var first = _.first(this.path);
      this.path = _.rest(this.path);
      this.coordinates = {
        x: first.y,
        y: first.x
      };
      eventManager.publish('command', {event: 'actor.update', parameters:this});
    }
  };
  unit.prototype.attack = function(){
    if(this.focus !== ''){
      eventManager.publish('actor.attack', this);
    }
  };
  return unit;
});