define(['actor', 'eventmanager', 'collisionGrid', 'standardlib', 'pathfinding'], function (actor, eventmanager, collisionGrid, stl, pathfinding) {
    return function (spec) {
        var that = actor(spec);

        var stats = {
            path: [],
            focus: '',
            strenght: 0,
            dexterity: 0,
            intelligence: 0,
            health: 0,
            death: false,
            hp: 0,
            speed: 20,
            attack: 10
        };

        var subscribe = {
            'new.gamecycle': 'move'
        };

        // extend the existing variables with the new one
        _.extend(that.variables, stats);
        _.extend(that.handlers.subscribe, subscribe);

        that.move = function () {

            var moveTo = {
                x: that.variables.coordinates.x + that.variables.speed,
                y: that.variables.coordinates.y + that.variables.speed
            };
            var config = {
                too: stl.worldPosToGridPos(moveTo),
                from: stl.worldPosToGridPos(that.variables.coordinates),
                height: that.variables.collision.height,
                width: that.variables.collision.width,
                success: function () {
                    that.variables.coordinates = moveTo;
                },
                failure: function () {
                    // Creation failed coordinates are blocked.
                }
            };
            collisionGrid.update(config);

        };

        that.generatePath = function (coordinates){
            pathfinding.generatePath(coordinates)
        };

        return that;
    };
});