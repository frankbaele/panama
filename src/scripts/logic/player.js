define([
  'eventmanager',
  'actor.unit.human.local'
], function (eventmanager, human) {

  var player = new human('road.png', {x:5, y:5});

  var getInfo = function (){
    return player;
  };
  return {
    getInfo : getInfo
  };
});