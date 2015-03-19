define(['eventmanager', 'world'], function (eventmanager, world) {
    var that = {};
    that.grid = superSizemap(world.grid);
    that.init = function () {
        // add the world grid and double it.
        that.grid = _.cloneDeep(world.mapData)
    };
    that.update = function (config){
        // check if the new coordinates are open.
        if(that.grid[config.too.y][config.too.x] === 0){
            that.grid[config.too.y][config.too.x] = 1;
            // if old coordinates are given open them up again.
            if(typeof config.from !== 'undefined'){
                that.grid[config.from.y][config.from.x] = 0;
            }
            // Execute the success callback if it exists
            if(typeof config.success !== 'undefined'){
                config.success();
            }
        } else{
            // execute the failure callback.
            if(typeof config.failure !== 'undefined'){
                config.failure();
            }
        }
    };
    that.isOpen = function(config){
        return that.grid[config.new.y][config.new.x] === 0;
    };

    function superSizemap(map) {
        var newmap = [];
        var amount = 2;
        for (var y = 0; y < map.length; y++) {
            for (var yAmount = 0; yAmount < amount; yAmount++) {
                var newY = (y * amount) + yAmount;
                newmap[newY] = [];
                for (var x = 0; x < map[0].length; x++) {
                    for (var xAmount = 0; xAmount < amount; xAmount++) {
                        var newX = (x * amount) + xAmount;
                        newmap[newY][newX] = map[y][x];
                    }
                }
            }
        }
        return newmap;
    }

    that.init();
    return that;
});
