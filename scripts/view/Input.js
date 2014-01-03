define(['EventManager', 'Mouse', 'keypress'], function (eventManager, mouse) {
  var my_combos = [
    {
      "keys"          : "up",
      "prevent_repeat" : true,
      "on_keydown"    : function() {
        eventManager.publish('panUp', 1)
      },
      "on_keyup"      : function() {
        eventManager.publish('panUp', 0)
      }
    },
    {
      "keys"          : "down",
      "prevent_repeat" : true,
      "on_keydown"    : function() {
        eventManager.publish('panDown', 1)
      },
      "on_keyup"      : function() {
        eventManager.publish('panDown', 0)
      }
    },
    {
      "keys"          : "left",
      "prevent_repeat" : true,
      "on_keydown"    : function() {
        eventManager.publish('panLeft', 1)
      },
      "on_keyup"      : function() {
        eventManager.publish('panLeft', 0)
      }
    },
    {
      "keys"          : "right",
      "prevent_repeat" : true,
      "on_keydown"    : function() {
        eventManager.publish('panRight', 1)
      },
      "on_keyup"      : function() {
        eventManager.publish('panRight', 0)
      }
    }
  ];
  keypress.register_many(my_combos);

  mouse.setLeftMouseCallback(function(e){
    eventManager.publish('leftMouse click', e)
  });
  mouse.setRightMouseCallback(function(e){
    eventManager.publish('rightMouse click', e)
  });

});