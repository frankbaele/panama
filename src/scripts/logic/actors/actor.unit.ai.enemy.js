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
      console.log('aww only ' + that.hp + ' left');
    });
    eventmanager.publish('actor.create', this);
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
    console.log('AAAAAAA Im death');
  };
  return enemy;
});