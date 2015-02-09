define(['actor.unit', 'eventmanager'], function (unit, eventmanager) {
  return function (spec) {
    var that = unit(spec);
    var stats = {
      focus : ''
    }
    _.extend(that.variables, stats);

    that.checkRightClick = function(e) {
      that.variables.goal = e;
      that.generatePath();
    };

    return that;
  }
});