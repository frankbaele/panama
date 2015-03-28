define(['collisionGrid', 'astar', 'standardlib'], function (collisionGrid, astar, stl) {
    var that = {};

    that.generatePath = function (config) {
        var from = stl.worldPosToGridPos(config.from);
        var too = stl.worldPosToGridPos(config.too);
        var start = collisionGrid.grid.graph.nodes[from.y][from.x];
        var end = collisionGrid.grid.graph.nodes[too.y][too.x];
        return astar.search(collisionGrid.grid.graph.nodes, start, end, true);
    };

    that.move = function (config) {
        // If the path is empty do not send move commands
        if (config.path.length !== 0) {
            // get the first part of the path
            var first = _.first(that.variables.path);

            var config = {
                from : that.variables.coordinates,
                too : {
                    x: first.y,
                    y: first.x
                },
                success : function(){
                    that.variables.path = _.rest(that.variables.path);
                    var change = {
                        x: that.variables.coordinates.x - first.y,
                        y: that.variables.coordinates.y - first.x
                    };
                    if (change.x == -1) {
                        that.variables.direction = 0;
                    } else if (change.x == 1) {
                        that.variables.direction = 2;
                    } else if (change.y == -1) {
                        that.variables.direction = 1;
                    } else if (change.y == 1) {
                        that.variables.direction = 3;
                    }
                    that.variables.coordinates = {
                        x: first.y,
                        y: first.x
                    };
                    eventmanager.publish('command', {event: 'actor.update', parameters: that});
                }
            };
            collisionGrid.update(config);

        }
    };

    return that;
});

