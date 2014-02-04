define(['actor.unit.ai', 'EventManager'], function (ai, eventManager) {
  function enemy(sprite, coordinates) {
    _.extend(this, new ai(sprite, coordinates));
    var that = this;
    eventManager.subscribe('mouse.click.left', function(e){
      that.checkLeftClick(e);
    });
    eventManager.subscribe('new.gamecycle', function(){
      that.move();
    });
    eventManager.publish('actor.create', this);
  }

  enemy.prototype = Object.create(ai.prototype);

  return enemy;
});