define(['actor.unit.ai', 'eventmanager'], function (ai, eventmanager) {
  function enemy(sprite, coordinates) {
    _.extend(this, new ai(sprite, coordinates));
    var that = this;
    eventmanager.subscribe('mouse.click.left', function(e){
      that.checkLeftClick(e);
    });
    eventmanager.subscribe('new.gamecycle', function(){
      that.move();
      that.attackActor();
      that.checkDeath();
    });
    eventmanager.subscribe('actor.attack.' + that.uuid, function(damage){
      that.hp = that.hp - parseInt(damage);
    });
    eventmanager.subscribe('actor.getObject.' + that.uuid, function (uuid){
      eventmanager.publish('actor.object.' + that.uuid, that);
    });
    eventmanager.publish('actor.create', that);
  }

  enemy.prototype = Object.create(ai.prototype);
  enemy.prototype.delete = function() {
    eventmanager.unsubscrive('mouse.click.left', function(e){
      that.checkLeftClick(e);
    });
    eventmanager.unsubscrive('new.gamecycle');
    eventmanager.unsubscrive('actor.selected');
    eventmanager.unsubscrive('actor.attack.' + this.uuid);
    eventmanager.publish('actor.delete', this.uuid);
  };
  return enemy;
});