define(['eventmanager', 'standardlib', 'actorList'], function (eventmanager, standardlib) {

  var Actor = function(sprite, coordinates){
    this.variables.coordinates = coordinates;
    this.variables.sprite = sprite;
    var that = this;
    // register all the event handlers
    _.each(this.handlers, function(handlers, type){
      if(type =='publish'){
        _.each(handlers, function(handler, event){
          eventmanager[type](event, eval(handler));
        })
      } else {
        _.each(handlers, function(handler, event){
          eventmanager[type](event, function(object){
            eval(handler);
          });
        });
      }

    })
  };
  Actor.prototype.variables = {
    coordinates: '',
    sprite: '',
    uuid: standardlib.guid(),
    hp: 0
  }

  Actor.prototype.handlers = {
    'publish' :{
      'actor.create'  : 'that;'
    },
    'subscribe' : {
      'mouse.click.right': 'that.checkRightClick(object);',
      'mouse.click.left': 'that.checkLeftClick(object);',
      'actor.selected': 'that.focus = object;',
      'actor.unselected': 'if(that.focus === object){that.focus = "";}',
      'actor.delete': 'if(that.focus === object){that.focus = "";}',
      'new.gamecycle': 'that.move();'
    }
  };
  Actor.prototype.checkLeftClick = function(e) {
    if(e.x == this.variables.coordinates.x && e.y == this.variables.coordinates.y){
      this.variables.selected = true;
      eventmanager.publish('actor.selected', this.variables.uuid);
    } else if (this.variables.selected){
      this.variables.selected = false;
      eventmanager.publish('actor.unselected', this.variables.uuid);
    }
  };

  Actor.prototype.delete = function() {
    var that = this;
    eventmanager.publish('actor.delete', this.variables.uuid);
  };

  Actor.prototype.getInfo = function() {
    return this.variables;
  };

  return Actor;

});