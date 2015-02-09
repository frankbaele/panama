define(['eventmanager', 'actorList', 'standardlib'], function (eventmanager, actorList, standardlib) {
  var that = {};

  that.init = function(sprite, coordinates){
    that.variables.coordinates = coordinates;
    that.variables.sprite = sprite;
    that.variables.uuid = standardlib.guid();
    // register all the event handlers
    /*
    _.each(that.handlers, function(handlers, type){
      _.each(handlers, function(handler, event){
        eventmanager[type](event,that[handler].apply());
      });
    })
    */

    return that;
  };

  that.variables = {
    coordinates: '',
    sprite: '',
    hp: 0
  };

  that.handlers = {
    'publish' :{
      'actor.create'  : 'getInfo'
    },
    'subscribe' : {
      'mouse.click.right': 'checkRightClick',
      'mouse.click.left': 'checkLeftClick',
      'actor.selected': 'checkFocus',
      'new.gamecycle': 'move'
    }
  };

  that.checkLeftClick = function(e) {
    if(e.x == that.variables.coordinates.x && e.y == that.variables.coordinates.y){
      that.variables.selected = true;
      eventmanager.publish('actor.selected', that.variables.uuid);
    } else if (that.variables.selected){
      that.variables.selected = false;
      eventmanager.publish('actor.unselected', that.variables.uuid);
    }
  };

  that.checkFocus = function(uuid) {

  };
  that.getInfo = function () {
    return that;
  }
  that.destroy = function () {
    eventmanager.publish('actor.delete', variables.uuid);
  };


  return that;
});