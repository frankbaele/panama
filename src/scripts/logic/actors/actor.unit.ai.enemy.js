define(['actor.unit.ai', 'EventManager'], function (ai, eventManager) {
  function enemy() {
    var that = this;
    that.path = [];
    that.aimed = false;
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