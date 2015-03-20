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
            attack: 10
        };

        var subscribe = {
            'new.gamecycle': 'move'
        };

        // extend the existing variables with the new one
        _.extend(that.variables, stats);
        _.extend(that.handlers.subscribe, subscribe);

        that.move = function () {

        };

        that.generatePath = function (coordinates){
            pathfinding.generatePath(coordinates)
        };

        return that;
    };
});