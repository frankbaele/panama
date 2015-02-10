define(['actor.unit', 'eventmanager'], function (unit, eventmanager) {
  return function (spec) {
    var that = unit(spec);
    var stats = {
      focus : ''
    }
    _.extend(that.variables, stats);

    var subscribe = {
      'mouse.click.right': 'checkRightClick'
    };

    _.extend(that.handlers.subscribe, subscribe);

    that.checkRightClick = function(e) {
      if(typeof e !== 'undefined'){
        that.variables.goal = e;
        that.generatePath();
      }
    };

    return that;
  }
});