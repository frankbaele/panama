define(['actor.unit', 'EventManager'], function (unit, eventManager) {
  function human(sprite, coordinates) {
    _.extend(this, new unit(sprite, coordinates));
    var that = this;
    eventManager.subscribe('leftMouse click', function(e){
      that.checkLeftClick(e);
    });
    eventManager.subscribe('newGameCycle', function(){
      that.move();
    });
  }

  human.prototype = Object.create(unit.prototype);
  return human;
});