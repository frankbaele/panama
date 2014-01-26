define(['EventManager', 'STL'], function (eventManager, stl) {
  function Actor(){
    var sprite,
      uuid,
      coordinates,
      selected,
      that = this;
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

  Actor.prototype.create = function(sprite, coordinates) {
    this.uuid = stl.guid();
    this.sprite = sprite;
    this.coordinates = coordinates;
    this.selected = false;
    eventManager.publish('ActorCreate', this);
  };

  Actor.prototype.delete = function() {
    eventManager.publish('ActorDelete', this);
  };

  return Actor;
});