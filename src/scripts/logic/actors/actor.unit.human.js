define(['actor.unit'], function (unit) {
  function human() {
    var that = this;
    that.path = [];
  }

  human.prototype = Object.create(unit.prototype);

  return human;
});