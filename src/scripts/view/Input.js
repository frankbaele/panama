define(['EventManager', 'keypress'], function (eventManager) {
  my_combos = [
    {
      "keys"          : "up",
      "prevent_repeat" : true,
      "on_keydown"    : function() {
        eventManager.publish('map up', 1)
      },
      "on_keyup"      : function(e) {
        eventManager.publish('map up', 0)
      }
    },
    {
      "keys"          : "down",
      "prevent_repeat" : true,
      "on_keydown"    : function() {
        eventManager.publish('map down', 1)
      },
      "on_keyup"      : function(e) {
        eventManager.publish('map down', 0)
      }
    },
    {
      "keys"          : "left",
      "prevent_repeat" : true,
      "on_keydown"    : function() {
        eventManager.publish('map left', 1)
      },
      "on_keyup"      : function(e) {
        eventManager.publish('map left', 0)
      }
    },
    {
      "keys"          : "right",
      "prevent_repeat" : true,
      "on_keydown"    : function() {
        eventManager.publish('map right', 1)
      },
      "on_keyup"      : function(e) {
        eventManager.publish('map right', 0)
      }
    },
  ];

  keypress.register_many(my_combos);
});