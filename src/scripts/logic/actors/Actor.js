define(['EventManager'], function (eventManager) {
  function Actor(){
    var sprite,
      coordinates;
  }

  Actor.prototype.create = function(sprite, coordinates) {
    this.sprite = sprite;
    this.coordinates = coordinates;
    eventManager.publish('ActorCreated', this)
  }

  return new Actor();
});