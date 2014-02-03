define(['actor.unit', 'EventManager'], function (unit, eventManager) {
  function human(sprite, coordinates) {
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

  human.prototype = Object.create(unit.prototype);
  return human;
});