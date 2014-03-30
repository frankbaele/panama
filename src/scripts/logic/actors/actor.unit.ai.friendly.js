define(['actor.unit.ai', 'eventmanager'], function (ai, eventmanager) {
  function friendly(sprite, coordinates) {
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
    eventmanager.publish('actor.create', this);
  }

  friendly.prototype = Object.create(ai.prototype);
  friendly.prototype.checkRightClick = function(e) {
    this.goal = e;
    this.generatePath();
  };
  friendly.prototype.checkLeftClick = function(e) {
    var that = this;
    if(e.x == that.coordinates.x && e.y == that.coordinates.y){
      that.selected = true;
      eventmanager.publish('actor.selected', this.uuid);
      eventmanager.subscribe('mouse.click.right', function(e){
        that.checkRightClick(e);
      });
    } else if (that.selected){
      that.selected = false;
      eventmanager.publish('actor.unselected', this.uuid);
      eventmanager.unsubscrive('mouse.click.right', function(e){
        that.checkRightClick(e);
      });
    }
  };
  friendly.prototype.delete = function() {
    eventmanager.unsubscrive('mouse.click.left', function(e){
      this.checkLeftClick(e);
    });
    eventmanager.unsubscrive('new.gamecycle');
    eventmanager.unsubscrive('actor.selected');
    eventmanager.unsubscrive('actor.attack.' + this.uuid);
    eventmanager.publish('actor.delete', this.uuid);
  };

  return friendly;
});