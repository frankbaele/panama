define([
  'eventmanager',
  'actor.unit.human.local'
], function (eventmanager, human) {

  var player = new human('ally.png', {x:5, y:5});

  var getInfo = function (){
    return player;
  };
  return {
    getInfo : getInfo
  };
});