
define(['actor', 'eventmanager', 'astar', 'world', 'underscore'], function (actor, eventmanager, astar, world) {

  var unit = actor;

  var stats = {
    path : [],
    focus : '',
    strenght : 0,
    dexterity : 0,
    intelligence : 0,
    health : 0,
    death : false,
    hp : 50,
    attack : 10
  }
  // extend the existing variables with the new one
  _.extend(unit.prototype.variables, stats);

  unit.prototype.generatePath = function(actor) {
    var start = world.graph.nodes[this.variables.coordinates.y][this.variables.coordinates.x];
    var end = world.graph.nodes[this.variables.goal.y][this.variables.goal.x];
    this.variables.path = astar.search(world.graph.nodes, start, end, true);
  };
  unit.prototype.move = function(){

    // If the path is empty do not send move commands
    if (this.variables.path.length !== 0){
      console.log('move');
      // get the first part of the path
      var first = _.first(this.variables.path);
      this.variables.path = _.rest(this.variables.path);

      this.variables.coordinates = {
        x: first.y,
        y: first.x
      };
      eventmanager.publish('command', {event: 'actor.update', parameters:this});
    }
  };
  unit.prototype.checkDeath = function(){
    if (this.hp <= 0 && !this.death){
      this.death = true;
      this.delete();
    }
  };

  unit.prototype.attackActor = function(){
    if(this.focus !== '' && this.focus !== this.uuid){
      eventmanager.publish('command', {event: 'actor.attack.' + this.focus, parameters:this.attack});
    }
  };
  return unit;
});