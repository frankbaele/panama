define(['actor.unit', 'eventmanager'], function (unit, eventmanager) {

  var that = unit;

  var stats = {
    focus : ''
  }
  _.extend(that.variables, stats);

  that.checkRightClick = function(e) {
    that.variables.goal = e;
    that.generatePath();
  };

  return that;
});