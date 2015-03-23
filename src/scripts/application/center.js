define(['eventmanager'],function (eventmanager) {
    var center = twoDToIso(0, 0);

    var pressedkeys = {
        up: 0,
        down: 0,
        left: 0,
        right: 0
    };
    
    function update() {
        var inbound = {x: 0, y: 0};
        if (pressedkeys.up === 1) {
            inbound.y = inbound.y - 1;
        }
        if (pressedkeys.down === 1) {
            inbound.y = inbound.y + 1;
        }
        if (pressedkeys.left === 1) {
            inbound.x = inbound.x - 1;
        }
        if (pressedkeys.right === 1) {
            inbound.x = inbound.x + 1;
        }
        // Only update the map position if there is a change.
        if (inbound.x !== 0 || inbound.y !== 0) {
            inbound = {x: center.x + inbound.x, y: center.y + inbound.y};
            center.x = inbound.x;
            center.y = inbound.y;
            eventmanager.publish('center.update.start');
        } else {
            eventmanager.publish('center.update.stop');
        }
    }
    
    function twoDToIso(posX, posY) {
        var newCoordinates = {};
        newCoordinates.x = ((posX - posY) / 2);
        newCoordinates.y = ((posX + posY) / 2);
        return newCoordinates;
    }
    
    eventmanager.subscribe('new.frame', function () {
        update();
    });
    eventmanager.subscribe('pan.up', function (e) {
        pressedkeys.up = e;
    });
    eventmanager.subscribe('pan.down', function (e) {
        pressedkeys.down = e;
    });
    eventmanager.subscribe('pan.left', function (e) {
        pressedkeys.left = e;
    });
    eventmanager.subscribe('pan.right', function (e) {
        pressedkeys.right = e;
    });
    return center;
});
