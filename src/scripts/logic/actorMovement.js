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
        // Convert the top path waypoint to pixel position
        var too = updatePosition(config);

        collisionGrid.update({
            from: stl.worldPosToGridPos(current),
            too: stl.worldPosToGridPos(too),
            height: config.height,
            width: config.width,
            success: function(){
                config.coordinates.next = _.cloneDeep(too);
            },
            failure: function(){
                generateLocalPath(config);
            }
        });

    };

    function generateLocalPath(config){
        var spliceValue = config.path.length > 5 ? 5 : config.path.length;
        if(spliceValue > 1){
            //config.path.splice(config.path, 0, spliceValue);
            var gridPos = stl.worldPosToGridPos(config.variables.coordinates.current);

        }
    }
    /**
     * Move the actor towards the goal
     * @param config
     */
    function updatePosition(config){
        var current = config.coordinates.current;

        var localGoal = stl.gridPosToWorldPos({
            x:config.path[0][1],
            y:config.path[0][0]
        });

        var next = _.cloneDeep(current);
        // X update
        if(current.x > localGoal.x){
            var difference = current.x - localGoal.x;
            next.x = difference <= config.speed ? localGoal.x : current.x - config.speed;
        } else if(current.x < localGoal.x){
            var difference =  localGoal.x - current.x;
            next.x = difference <= config.speed ? localGoal.x : current.x + config.speed;
        }
        // Y update
        if(current.y > localGoal.y){
            var difference = current.y - localGoal.y;
            next.y = difference <= config.speed ? localGoal.y : current.y - config.speed/2;

        } else if(current.y < localGoal.y){
            var difference =  localGoal.y - current.y;
            next.y = difference <= config.speed ? localGoal.y : current.y + config.speed/2;
        }
        // If on mark move to the next path point
        if(current.x == localGoal.x && current.y == localGoal.y){
            config.path.shift();
        }

        return next;
    }
    return that;
});

