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
            //pathfinding.move()
        };

        that.generatePath = function (coordinates){
            pathfinding.generatePath(coordinates)
        };

        return that;
    };
});