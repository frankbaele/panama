define(['actor.unit', 'eventmanager'], function (unit, eventmanager) {
  function ai(sprite, coordinates) {
    _.extend(this, new unit(sprite, coordinates));
  }

  ai.prototype = Object.create(unit.prototype);

  return ai;
});