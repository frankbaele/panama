define(['actor', 'eventmanager', 'pathfinding'], function (actor, eventmanager, pathfinding) {
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
            speed: 5,
            attack: 10
        };

        var subscribe = {
            'new.gamecycle': 'move'
        };

        // extend the existing variables with the new one
        _.extend(that.variables, stats);
        _.extend(that.handlers.subscribe, subscribe);

        that.move = function () {
            //that.variables.coordinates.x = that.variables.coordinates.x + that.variables.speed;
            //that.variables.coordinates.y = that.variables.coordinates.y + that.variables.speed;
        };

        that.generatePath = function (coordinates){
            pathfinding.generatePath(coordinates)
        };

        return that;
    };
});