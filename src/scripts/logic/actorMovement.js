define(['collisionGrid', 'standardlib','pathfinding' ], function (collisionGrid, stl, PF) {
    var that = {};
    that.finder = new PF.AStarFinder({
        allowDiagonal: true,
        dontCrossCorners: true
    });

    that.generatePath = function (config) {
        var grid = collisionGrid.grid.graph.clone();
        var from = stl.worldPosToGridPos(config.from);
        var too = stl.worldPosToGridPos(config.too);
        var path = that.finder.findPath(from.y, from.x, too.y, too.x, grid);
        // remove the first item as it is the current location
        var newPath = PF.Util.smoothenPath(grid, path);
        return newPath;
    };

    /**
     * Sets the local target for the pixel movement
     * TODO: add collision detection and path recalculation
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

    that.generateLocalPath = function(config){
        var spliceValue = config.path.length > 5 ? 5 : config.path.length - 1;
        if(spliceValue > 1){
            var gridPos = stl.worldPosToGridPos(config.coordinates.current);
            // Reorder the start and end values by actual position
            var start = {};
            var end = {};
            start.x = gridPos.x <= config.path[0][1]? gridPos.x : config.path[0][1];
            end.x = gridPos.x > config.path[0][1]? gridPos.x : config.path[0][1];

            start.y = gridPos.y <= config.path[0][0]? gridPos.y : config.path[0][0];
            end.y = gridPos.y > config.path[0][0]? gridPos.y : config.path[0][0];

            var size = end.x - start.x < end.y - start.y ? end.y - start.y : end.x - start.x;
            var negativeSize = {
                x: start.x < size ? start.x: size,
                y: start.y < size ? start.y: size
            };
            var grid = collisionGrid.getSubGrid({
                start:{
                    x: start.x - negativeSize.x,
                    y: start.y - negativeSize.y
                },
                size:size + (negativeSize.x < negativeSize.y ? negativeSize.x : negativeSize.y)
            });

            var path = that.finder.findPath(
                start.y - start.y,
                start.x - start.x,
                end.y - start.y,
                end.x - start.x,
                grid);
            _.each(path, function(item){
                item[0] = item[0] + start.y;
                item[1] = item[1] + start.x;
            });
            if(path.length > 0){
                config.path.splice(0, spliceValue);
                config.path = path.concat(config.path);
            }
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
    }
    return that;
});

