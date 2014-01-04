define(['actor.unit', 'EventManager'], function (unit, eventManager) {
  function ai() {
    var that = this;
    that.path = [];
  }

  ai.prototype = Object.create(unit.prototype);

  return ai;
});