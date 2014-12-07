define(['actor.unit', 'eventmanager'], function (unit, eventmanager) {

  var local = unit;

  var stats = {
    focus : ''
  }
  _.extend(local.prototype.variables, stats);

  local.prototype.checkRightClick = function(e) {
    this.variables.goal = e;
    this.generatePath();
  };

  return local;
});