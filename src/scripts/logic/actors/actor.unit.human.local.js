define(['actor.unit.human', 'EventManager'], function (human, eventManager) {
  function local(sprite, coordinates) {
    _.extend(this, new human(sprite, coordinates));
    this.focus = '';
    var that = this;
    eventManager.subscribe('mouse.click.right', function(e){
      that.checkRightClick(e);
    });
    eventManager.subscribe('mouse.click.left', function(e){
      that.checkLeftClick(e);
    });
    eventManager.subscribe('new.gamecycle', function(){
      that.move();
      that.attackActor();
      that.checkDeath();
    });
    eventManager.subscribe('actor.selected', function(uuid){
      that.focus = uuid;
    });
    eventManager.subscribe('actor.unselected', function(uuid){
      if(that.focus === uuid){
        that.focus = '';
      }
    });
    eventManager.subscribe('actor.delete', function (uuid){
      if(that.focus === uuid){
        that.focus = '';
      }
    });
    eventManager.subscribe('actor.attack' + that.uuid, function(damage){
      that.hp = that.hp - parseInt(damage);
    });
    eventManager.publish('actor.create', this);
  }

  local.prototype = Object.create(human.prototype);

  local.prototype.checkRightClick = function(e) {
    this.goal = e;
    this.generatePath();
  };

  return local;
});