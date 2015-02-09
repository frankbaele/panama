
define(['actor', 'eventmanager', 'astar', 'world', 'underscore'], function (actor, eventmanager, astar, world) {

  var that = actor;

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
  _.extend(that.variables, stats);

  that.generatePath = function() {
    console.log(that);
    var start = world.graph.nodes[that.variables.coordinates.y][that.variables.coordinates.x];
    var end = world.graph.nodes[that.variables.goal.y][that.variables.goal.x];
    that.variables.path = astar.search(world.graph.nodes, start, end, true);
  };

  that.move = function(){

    // If the path is empty do not send move commands
    if (that.variables.path.length !== 0){
      // get the first part of the path
      var first = _.first(that.variables.path);
      that.variables.path = _.rest(that.variables.path);

      that.variables.coordinates = {
        x: first.y,
        y: first.x
      };
      eventmanager.publish('command', {event: 'actor.update', parameters:that});
    }
  };
  that.checkDeath = function(){
    if (that.hp <= 0 && !that.death){
      that.death = true;
      that.delete();
    }
  };

  that.attackActor = function(){
    if(that.focus !== '' && that.focus !== that.uuid){
      eventmanager.publish('command', {event: 'actor.attack.' + that.focus, parameters:that.attack});
    }
  };

  return that;
});