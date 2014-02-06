define(['EventManager', 'STL'], function (eventManager, stl) {
  function Actor(sprite, coordinates){
    this.coordinates = coordinates;
    this.sprite = sprite;
    this.uuid = stl.guid();
    this.hp = 0;
  }

  Actor.prototype.checkLeftClick = function(e) {
    if(e.x == this.coordinates.x && e.y == this.coordinates.y){
      this.selected = true;
      eventManager.publish('actor.selected', this.uuid);
    } else if (this.selected){
      this.selected = false;
      eventManager.publish('actor.unselected', this.uuid);
    }
  };

  Actor.prototype.delete = function() {
    eventManager.publish('actor.delete', this.uuid);
  };
  return Actor;
});