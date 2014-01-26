define(['actor.unit.human', 'EventManager'], function (human, eventManager) {
  function local() {
    var that = this;
    that.path = [];
    eventManager.subscribe('leftMouse click', function(e){
      that.checkLeftClick(e);
    });
    eventManager.subscribe('rightMouse click', function(e){
      that.checkRightClick(e);
    });
    eventManager.subscribe('newGameCycle', function(){
      that.move();
    });
  }

  local.prototype = Object.create(human.prototype);

  local.prototype.checkLeftClick = function(e) {
    this.goal = e;
    this.generatePath();
  };

  return local;
});