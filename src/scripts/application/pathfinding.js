define(['collisionGrid'], function (collisionGrid) {
    return function (spec) {
        var that = {};

        that.generatePath = function () {
            var start = world.graph.nodes[that.variables.coordinates.y][that.variables.coordinates.x];
            var end = world.graph.nodes[that.variables.goal.y][that.variables.goal.x];
            that.variables.path = astar.search(world.graph.nodes, start, end, true);
        };

        that.move = function () {
            // If the path is empty do not send move commands
            if (that.variables.path.length !== 0) {

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
    };
});

