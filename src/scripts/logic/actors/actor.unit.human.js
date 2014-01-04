define(['actor.unit'], function (unit) {
  function human() {
    var that = this;
    that.path = [];
    eventManager.subscribe('leftMouse click', function(e){
      that.checkLeftClick(e);
    });
    eventManager.subscribe('newGameCycle', function(){
      that.move();
    });
  }

  human.prototype = unit.prototype;

  return human;
});