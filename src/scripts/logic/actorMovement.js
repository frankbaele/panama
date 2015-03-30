define(['collisionGrid', 'standardlib','pathfinding' ], function (collisionGrid, stl, PF) {
    var that = {};

    that.generatePath = function (config) {
        var grid = collisionGrid.grid.graph.clone();

        var from = stl.worldPosToGridPos(config.from);
        var too = stl.worldPosToGridPos(config.too);
        var finder = new PF.AStarFinder({
            allowDiagonal: true,
            dontCrossCorners: true
        });
        var path = finder.findPath(from.y, from.x, too.y, too.x, grid);
        path =  PF.Util.smoothenPath(grid, path);
        // remove the first item as it is the current location
        path.shift();
        return path;
    };
    /**
     * Sets the local target for the pixel movement
     * TODO: add collision detection and path recalculation
     * @param config
     */
    that.move = function (config) {
        var current = config.coordinates.current;
        var next = config.coordinates.next;
        var previous = config.coordinates.previous;
        var difference = 0;

        // Override the previous width the current
        previous = _.cloneDeep(current);

        // Convert the top path waypoint to pixel position
        var localGoal = stl.gridPosToWorldPos({
            x:config.path[0][1],
            y:config.path[0][0]
        });
        // X update
        if(current.x > localGoal.x){
            difference = current.x - localGoal.x;
            next.x = difference <= config.speed ? localGoal.x : current.x - config.speed;
        } else if(current.x < localGoal.x){
            difference =  localGoal.x - current.x;
            next.x = difference <= config.speed ? localGoal.x : current.x + config.speed;
        }
        // Y update
        if(current.y > localGoal.y){
            difference = current.y - localGoal.y;
            next.y = difference <= config.speed ? localGoal.y : current.y - config.speed/2;

        } else if(current.y < localGoal.y){
            difference =  localGoal.y - current.y;
            next.y = difference <= config.speed ? localGoal.y : current.y + config.speed/2;
        }
        // If on mark move to the next path point
        if(current.x == localGoal.x && current.y == localGoal.y){
            config.path.shift();
        }
    };

    return that;
});

