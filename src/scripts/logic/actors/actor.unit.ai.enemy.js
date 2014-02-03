define(['actor.unit.ai', 'EventManager'], function (ai, eventManager) {
  function enemy(sprite, coordinates) {
    this.coordinates = coordinates;
    this.sprite = sprite;
    var that = this;
    eventManager.subscribe('leftMouse click', function(e){
      that.checkLeftClick(e);
    });
    eventManager.subscribe('newGameCycle', function(){
      that.move();
    });
  }

  enemy.prototype = Object.create(ai.prototype);

  return enemy;
});