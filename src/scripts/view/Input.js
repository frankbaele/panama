define(['EventManager', 'Mouse', 'keypress'], function (eventManager, mouse) {
  var my_combos = [
    {
      "keys"          : "up",
      "prevent_repeat" : true,
      "on_keydown"    : function() {
        eventManager.publish('pan.up', 1)
      },
      "on_keyup"      : function() {
        eventManager.publish('pan.up', 0)
      }
    },
    {
      "keys"          : "down",
      "prevent_repeat" : true,
      "on_keydown"    : function() {
        eventManager.publish('pan.down', 1)
      },
      "on_keyup"      : function() {
        eventManager.publish('pan.down', 0)
      }
    },
    {
      "keys"          : "left",
      "prevent_repeat" : true,
      "on_keydown"    : function() {
        eventManager.publish('pan.left', 1)
      },
      "on_keyup"      : function() {
        eventManager.publish('pan.left', 0)
      }
    },
    {
      "keys"          : "right",
      "prevent_repeat" : true,
      "on_keydown"    : function() {
        eventManager.publish('pan.right', 1)
      },
      "on_keyup"      : function() {
        eventManager.publish('pan.right', 0)
      }
    }
  ];
  keypress.register_many(my_combos);

  mouse.setLeftMouseCallback(function(e){
    eventManager.publish('mouse.click.left', e)
  });
  mouse.setRightMouseCallback(function(e){
    eventManager.publish('mouse.click.right', e)
  });

});