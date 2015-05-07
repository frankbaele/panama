define(['q', 'world'], function ($q, world) {

    var that = {};

    that.load = function (name) {
        var defer = $q.defer();
        jQuery.getJSON('/maps/' + name + '/' + name + '.json').then(function (data) {
                console.log(data);
                app.config.terrain.grid = {
                    width: data.width,
                    height: data.height
                };

                app.config.actor.grid = {
                    width: data.width * 2,
                    height: data.height * 2
                };

                world.grid = generateWorldMap(_.findWhere(data.layers, function(layer){
                    return layer.name == 'tiles';
                }));
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
