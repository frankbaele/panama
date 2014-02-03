define(['actor.unit', 'EventManager'], function (unit, eventManager) {
  function human(sprite, coordinates) {
    _.extend(this, new unit(sprite, coordinates));
  }

  human.prototype = Object.create(unit.prototype);
  return human;
});