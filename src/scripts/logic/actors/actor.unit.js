define(['actor', 'eventmanager', 'collisionGrid', 'standardlib', 'actorMovement'], function (actor, eventmanager, collisionGrid, stl, actorMovement) {
    return function (spec) {
        var that = actor(spec);

        var stats = {
            path: [],
            focus: '',
            height: 2,
            width: 2,
            strenght: 0,
            dexterity: 0,
            intelligence: 0,
            health: 0,
            death: false,
            hp: 0,
            speed: 5,
            attack: 10,
            stuck: false
        };

        var subscribe = {
            'new.gamecycle': 'move'
        };

        // extend the existing variables with the new one
        _.extend(that.variables, stats);
        _.extend(that.handlers.subscribe, subscribe);
        /**
         * every cycle we move closer to our our current goal
         */
        that.move = function () {
            if (that.variables.path.length > 0) {
                actorMovement.move({
                    path: that.variables.path,
                    coordinates: that.variables.coordinates,
                    speed: that.variables.speed,
                    height: that.variables.collision.height,
                    width: that.variables.collision.width
                })
            }
        };

        that.generatePath = function (coordinates) {
            that.variables.path = actorMovement.generatePath({
                from: that.variables.coordinates.current,
                too: coordinates,
                stuck: that.variables.stuck
            });
        };

        return that;
    };
});