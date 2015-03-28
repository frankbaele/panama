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
        //path =  PF.Util.smoothenPath(grid, path);
        // remove the first item as it is the current location
        path.shift();
        return path;
    };

    that.move = function (config) {
        var localGoal = stl.gridPosToWorldPos({
            x:config.path[0][1],
            y:config.path[0][0]
        });
        // X update
        if(config.coordinates.x > localGoal.x){
            var difference = config.coordinates.x - localGoal.x;
            config.coordinates.x = difference <= config.speed ? localGoal.x : config.coordinates.x - config.speed;

        } else if(config.coordinates.x < localGoal.x){
            var difference =  localGoal.x - config.coordinates.x;
            config.coordinates.x = difference <= config.speed ? localGoal.x : config.coordinates.x + config.speed;
        }
        // Y update

        if(config.coordinates.y > localGoal.y){
            var difference = config.coordinates.y - localGoal.y;
            config.coordinates.y = difference <= config.speed ? localGoal.y : config.coordinates.y - config.speed;

        } else if(config.coordinates.y < localGoal.y){
            var difference =  localGoal.y - config.coordinates.y;
            config.coordinates.y = difference <= config.speed ? localGoal.y : config.coordinates.y + config.speed;
        }
        // If on mark move to the next path point
        if(config.coordinates.x == localGoal.x && config.coordinates.y == localGoal.y){

            config.path.shift();
        }

    };

    return that;
});

