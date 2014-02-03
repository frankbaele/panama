define(['actor.unit', 'EventManager'], function (unit, eventManager) {
  function ai(sprite, coordinates) {
    this.coordinates = coordinates;
    this.sprite = sprite;
    eventManager.publish('ActorCreate', this);
  }

  ai.prototype = Object.create(unit.prototype);

  return ai;
});