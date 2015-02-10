define(['eventmanager', 'mouse', 'keypress'], function (eventmanager, mouse) {
  var my_combos = [
    {
      "keys"          : "up",
      "prevent_repeat" : true,
      "on_keydown"    : function() {
        eventmanager.publish('pan.up', 1)
      },
      "on_keyup"      : function() {
        eventmanager.publish('pan.up', 0)
      }
    },
    {
      "keys"          : "down",
      "prevent_repeat" : true,
      "on_keydown"    : function() {
        eventmanager.publish('pan.down', 1)
      },
      "on_keyup"      : function() {
        eventmanager.publish('pan.down', 0)
      }
    },
    {
      "keys"          : "left",
      "prevent_repeat" : true,
      "on_keydown"    : function() {
        eventmanager.publish('pan.left', 1)
      },
      "on_keyup"      : function() {
        eventmanager.publish('pan.left', 0)
      }
    },
    {
      "keys"          : "right",
      "prevent_repeat" : true,
      "on_keydown"    : function() {
        eventmanager.publish('pan.right', 1)
      },
      "on_keyup"      : function() {
        eventmanager.publish('pan.right', 0)
      }
    }
  ];
  keypress.register_many(my_combos);

  mouse.setLeftmouseCallback(function(e){
    eventmanager.publish('mouse.click.left', e);
  });
  mouse.setRightmouseCallback(function(e){
    eventmanager.publish('mouse.click.right', e)
  });

});