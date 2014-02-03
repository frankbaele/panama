define(['actor.unit.human', 'EventManager'], function (human, eventManager) {
  function local(sprite, coordinates) {
    _.extend(this, new human(sprite, coordinates));
    var that = this;
    eventManager.subscribe('rightMouse click', function(e){
      that.checkRightClick(e);
    });
    eventManager.subscribe('newGameCycle', function(){
      that.move();
    });
    eventManager.subscribe('ActorSelected', function(e){

    });
    eventManager.subscribe('ActorUnSelected', function(e){

    });

    eventManager.publish('ActorCreate', this);
  }

  local.prototype = Object.create(human.prototype);

  local.prototype.checkRightClick = function(e) {
    this.goal = e;
    this.generatePath();
  };

  return local;
});