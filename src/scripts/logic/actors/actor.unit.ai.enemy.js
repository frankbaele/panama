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
    eventManager.subscribe('rightMouse click', function(e){
      that.checkRightClick(e);
    });
  }

  enemy.prototype = Object.create(ai.prototype);

  enemy.prototype.checkLeftClick = function(e) {
    if(e.x == this.coordinates.x && e.y == this.coordinates.y){
      this.aimed = true;
      eventManager.publish('ActorAimed', this);
    } else if (this.aimed){
      this.aimed = false;
      eventManager.publish('ActorUnAimed', this);
    }
  }

  return enemy;
});