define(['eventmanager', 'world'], function (eventmanager, world) {
    var that = {};
    that.grid = [];
    that.init = function () {
        // add the world grid
        that.grid = _.cloneDeep(world.mapData);
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

    that.init();
    return that;
});
