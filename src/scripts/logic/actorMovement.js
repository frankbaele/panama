define(['collisionGrid', 'standardlib', 'PF', 'RVO'], function (collisionGrid, stl, PF, RVO) {
    var that = {};
    that.finder = new PF.AStarFinder({
        allowDiagonal: true,
        dontCrossCorners: true
    });
    that.generatePath = function (config) {
        var grid = collisionGrid.grid.graph.clone();

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
        if(reachedGoal([actor.variables.coordinates.current.y, actor.variables.coordinates.current.x],[next.y, next.x])){
            actor.variables.path.shift();
            if (actor.variables.path.length > 0) {
                actor.variables.coordinates.next = stl.gridPosToWorldPos({
                    x: actor.variables.path[0][1],
                    y: actor.variables.path[0][0]
                });
            }
        } else {
            actor.variables.coordinates.next = stl.gridPosToWorldPos({
                x: actor.variables.path[0][1],
                y: actor.variables.path[0][0]
            });
        }
    };
    function reachedGoal(current, goal) {
        if (RVO.Vector.absSq(RVO.Vector.subtract(current, goal)) > 1) {
            return false;
        }
        return true;
    }

    return that;
});

