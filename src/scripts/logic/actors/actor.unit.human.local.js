define(['actor.unit.human', 'EventManager'], function (human, eventManager) {
  function local(sprite, coordinates) {
    _.extend(this, new human(sprite, coordinates));
    var that = this;
    eventManager.subscribe('mouse.click.right', function(e){
      that.checkRightClick(e);
    });
    eventManager.subscribe('mouse.click.left', function(e){
      that.checkLeftClick(e);
    });
    eventManager.subscribe('new.gamecycle', function(){
      that.move();

    });
    eventManager.subscribe('actor.selected', function(e){

    });
    eventManager.subscribe('actor.unselected', function(e){

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