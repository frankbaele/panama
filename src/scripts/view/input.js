define(['eventmanager', 'mouse', 'Keypress'], function (eventmanager, mouse, Keypress) {
    var listener = new Keypress.Listener();
    var my_combos = [
        {
            "keys": "up",
            "prevent_repeat": true,
            "on_keydown": function () {
                eventmanager.publish('pan.up', 1)
            },
            "on_keyup": function () {
                eventmanager.publish('pan.up', 0)
            }
        },
        {
            "keys": "down",
            "prevent_repeat": true,
            "on_keydown": function () {
                eventmanager.publish('pan.down', 1)
            },
            "on_keyup": function () {
                eventmanager.publish('pan.down', 0)
            }
        },
        {
            "keys": "left",
            "prevent_repeat": true,
            "on_keydown": function () {
                eventmanager.publish('pan.left', 1)
            },
            "on_keyup": function () {
                eventmanager.publish('pan.left', 0)
            }
        },
        {
            "keys": "right",
            "prevent_repeat": true,
            "on_keydown": function () {
                eventmanager.publish('pan.right', 1)
            },
            "on_keyup": function () {
                eventmanager.publish('pan.right', 0)
            }
        }
    ];
    listener.register_many(my_combos);
});