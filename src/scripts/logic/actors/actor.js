define(['EventManager', 'STL'], function (eventManager, stl) {
  function Actor(sprite, coordinates){
    this.coordinates = coordinates;
    this.sprite = sprite;
    this.uuid = stl.guid();
  }

  Actor.prototype.checkLeftClick = function(e) {
    if(e.x == this.coordinates.x && e.y == this.coordinates.y){
      this.selected = true;
      eventManager.publish('ActorSelected', this.uuid);
    } else if (this.selected){
      this.selected = false;
      eventManager.publish('ActorUnSelected', this.uuid);
    }
  };

  Actor.prototype.delete = function() {
    eventManager.publish('ActorDelete', this);
  };

  return Actor;
});