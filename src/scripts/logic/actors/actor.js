define(['eventmanager', 'standardlib', 'actorList'], function (eventmanager, standardlib) {
  function Actor(sprite, coordinates){
    this.coordinates = coordinates;
    this.sprite = sprite;
    this.uuid = standardlib.guid();
    this.hp = 0;
  }

  Actor.prototype.checkLeftClick = function(e) {
    if(e.x == this.coordinates.x && e.y == this.coordinates.y){
      this.selected = true;
      eventmanager.publish('actor.selected', this.uuid);
    } else if (this.selected){
      this.selected = false;
      eventmanager.publish('actor.unselected', this.uuid);
    }
  };

  Actor.prototype.delete = function() {
    eventmanager.publish('actor.delete', this.uuid);
  };
  return Actor;
});