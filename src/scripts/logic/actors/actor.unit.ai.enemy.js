define(['actor.unit.ai', 'EventManager'], function (ai, eventManager) {
  function enemy(sprite, coordinates) {
    _.extend(this, new ai(sprite, coordinates));
    var that = this;
    eventManager.subscribe('mouse.click.left', function(e){
      that.checkLeftClick(e);
    });
    eventManager.subscribe('new.gamecycle', function(){
      that.move();
      that.attackActor();
      that.checkDeath();
    });
    eventManager.subscribe('actor.attack.' + that.uuid, function(damage){
      that.hp = that.hp - parseInt(damage);
      console.log('aww only ' + that.hp + ' left');
    });
    eventManager.publish('actor.create', this);
  }

  enemy.prototype = Object.create(ai.prototype);
  enemy.prototype.delete = function() {
    eventManager.unsubscrive('mouse.click.left', function(e){
      that.checkLeftClick(e);
    });
    eventManager.unsubscrive('new.gamecycle');
    eventManager.unsubscrive('actor.selected');
    eventManager.unsubscrive('actor.attack.' + this.uuid);
    eventManager.publish('actor.delete', this.uuid);
    console.log('AAAAAAA Im death');
  };
  return enemy;
});