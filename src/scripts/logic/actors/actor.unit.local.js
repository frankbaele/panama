define(['actor.unit', 'eventmanager'], function (unit, eventmanager) {
  return function (spec) {
    var that = unit(spec);
    var stats = {
      focus : '',
      state: 'base'
    }
    _.extend(that.variables, stats);

    var subscribe = {
      'map.click': 'checkMapClick'
    };

    _.extend(that.handlers.subscribe, subscribe);

    that.checkMapClick = function(e) {
      if(that.selected){
        that.variables.goal = e;
        that.generatePath();
      }
    };

    return that;
  }
});