define(['actor.unit.human', 'eventmanager'], function (human, eventmanager) {
  function local(sprite, coordinates) {
    _.extend(this, new human(sprite, coordinates));
    this.focus = '';
    var that = this;
    eventmanager.subscribe('mouse.click.right', function(e){
      that.checkRightClick(e);
    });
    eventmanager.subscribe('mouse.click.left', function(e){
      that.checkLeftClick(e);
    });
    eventmanager.subscribe('new.gamecycle', function(){
      that.move();
      that.attackActor();
      that.checkDeath();
    });
    eventmanager.subscribe('actor.selected', function(uuid){
      that.focus = uuid;
    });
    eventmanager.subscribe('actor.unselected', function(uuid){
      if(that.focus === uuid){
        that.focus = '';
      }
    });
    eventmanager.subscribe('actor.delete', function (uuid){
      if(that.focus === uuid){
        that.focus = '';
      }
    });
    eventmanager.subscribe('actor.attack' + that.uuid, function(damage){
      that.hp = that.hp - parseInt(damage);
    });
    eventmanager.publish('actor.create', this);
  }

  local.prototype = Object.create(human.prototype);

  local.prototype.checkRightClick = function(e) {
    this.goal = e;
    this.generatePath();
  };

  return local;
});