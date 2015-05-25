define(['q', 'world'], function ($q, world) {

    var that = {};

    that.load = function (name) {
        var defer = $q.defer();
        jQuery.getJSON('maps/' + name + '/' + name + '.json')
            .then(function (data) {
                app.config.terrain.grid = {
                    width: data.width,
                    height: data.height
                };
                // get the tilset and put it in config
                app.config.terrain.tileSet = _.findWhere(data.tilesets, {name : 'terrain'});
                // remove the path to the terrain folder, so we can easily match on it.
                _.each(app.config.terrain.tileSet.tiles, function(tile){
                    tile.image = tile.image.split("terrain/").pop();
                });
                app.config.actor.grid = {
                    width: data.width * 2,
                    height: data.height * 2
                };
                app.config.collision = _.findWhere(data.layers, {name : 'collision'});
                world.grid = generateWorldMap(_.findWhere(data.layers, {name : 'tiles'}));
                defer.resolve();
            }
        );
        return defer.promise;
    };

    function generateWorldMap(layer){
        var grid = [];
        for(var i = 0; i < layer.width; i++){
            grid.push(layer.data.splice(0,30));
        }

        return grid;
    }

    return that;
});
