define(['collisionGrid', 'standardlib', 'pathfinding'], function (collisionGrid, stl, PF) {
    var that = {};
    that.finder = new PF.AStarFinder({
        allowDiagonal: false,
        dontCrossCorners: true
    });
    that.generatePath = function (config) {
        var grid = collisionGrid.graph.clone();
        config.from.x = config.from.x > 0? config.from.x : 0;
        config.from.y = config.from.y > 0? config.from.y : 0;
        var path = that.finder.findPath(config.from.y, config.from.x, config.too.y, config.too.x, grid);
        // remove the first item as it is the current location
        var newPath = PF.Util.smoothenPath(grid, path);
        newPath.shift();
        return newPath;
    };

    /**
     * Sets the local target for the pixel movement
     * @param config
     */
    that.move = function (actor) {
        var next = stl.gridPosToWorldPos({
            x: actor.variables.path[0][1],
            y: actor.variables.path[0][0]
        });
        // If on mark move to the next path point
        if(reachedGoal([actor.variables.coordinates.current.y, actor.variables.coordinates.current.x],[next.y, next.x], actor.variables.radius)){
            actor.variables.path.shift();
            if (actor.variables.path.length > 0) {
                actor.variables.coordinates.next = stl.gridPosToWorldPos({
                    x: actor.variables.path[0][1],
                    y: actor.variables.path[0][0]
                });
            } else {
                actor.variables.coordinates.next = null;
            }
        } else {
            actor.variables.coordinates.next = stl.gridPosToWorldPos({
                x: actor.variables.path[0][1],
                y: actor.variables.path[0][0]
            });
        }
    };
    function reachedGoal(current, goal, radius) {
        if (Math.pow(goal[0] - current[0], 2) + Math.pow(goal[1] - current[1],2) <= Math.pow(radius, 2)) {
            return true;
        }
        return false;
    }

    return that;
});

