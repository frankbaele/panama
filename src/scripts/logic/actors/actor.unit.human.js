define(['actor.unit', 'eventmanager'], function (unit, eventmanager) {
  function human(sprite, coordinates) {
    _.extend(this, new unit(sprite, coordinates));
  }

  human.prototype = Object.create(unit.prototype);
  return human;
});