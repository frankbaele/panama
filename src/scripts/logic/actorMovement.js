define(['collisionGrid', 'standardlib','PF', 'steer'], function (collisionGrid, stl, PF, steer) {
    var that = {};
    that.finder = new PF.AStarFinder({
        allowDiagonal: true,
        dontCrossCorners: true
    });
    that.generatePath = function (config) {
        var grid = collisionGrid.grid.graph.clone();
        var path = that.finder.findPath(config.from.y, config.from.x, config.too.y, config.too.x, grid);
        // remove the first item as it is the current location
        var newPath = PF.Util.smoothenPath(grid, path);
        return newPath;
    };

    /**
     * Sets the local target for the pixel movement
     * @param config
     */
    that.move = function (config) {
        var current = config.coordinates.current;
        // Convert the top path waypoint to pixel position

        config.localGoal = stl.gridPosToWorldPos({
            x:config.path[0][1],
            y:config.path[0][0]
        });
        if(config.stuck){
            that.generateLocalPath(config);
            config.coordinates.next = _.cloneDeep(that.updateNext(config));
        } else {
            config.coordinates.next = _.cloneDeep(that.updateNext(config));
        }
        // If on mark move to the next path point
        if(current.x == config.localGoal.x && current.y == config.localGoal.y){
            config.path.shift();
        }
    };

    /**
     * Move the actor towards the goal
     * @param config
     */
    that.updateNext = function(config){
        var current = config.coordinates.current;
        var next = _.cloneDeep(current);
        // X update
        if(current.x > config.localGoal.x){
            var difference = config.localGoal.x - current.x;
            next.x = difference <= config.speed ? config.localGoal.x : current.x - config.speed;
        } else if(current.x < config.localGoal.x){
            var difference = current.x - config.localGoal.x;
            next.x = difference <= config.speed ? config.localGoal.x : current.x + config.speed;
        }
        // Y update
        if(current.y > config.localGoal.y){
            var difference = config.localGoal.y - current.y;
            next.y = difference <= config.speed ? config.localGoal.y : current.y - config.speed/2;

        } else if(current.y < config.localGoal.y){
            var difference =  current.y - config.localGoal.y;
            next.y = difference <= config.speed ? config.localGoal.y : current.y + config.speed/2;
        }
        return next;
    };
    return that;
});

