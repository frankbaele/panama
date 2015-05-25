define(['spriteSheet', 'text!assetsList', 'q'], function (spriteSheet, assetsList, $q) {
    var defers = [];
    var assets = {
        config: {},
        loaded: {
            atlas: [],
            music: []
        }
    };

    assets.config = JSON.parse(assetsList);

    var preloadassets = function () {
        var defers = [];
        // loop through the asset object and load each asset file
        _.forEach(assets.config, function (asset) {
            var defer = $q.defer();
            jQuery.getJSON(asset.configuration, function (data) {
                asset.configuration = data;
            }).then(function () {
                    var img = new Image();
                    img.src = asset.file;
                    img.onload = function(){
                        assets.loaded.atlas.push({
                            name: asset.name,
                            sprite: new spriteSheet(asset.configuration, img)
                        });

                        defer.resolve();
                    };
                }
            );
            defers.push(defer.promise);
        });
        return $q.all(defers);
    };

    return {
        preloadassets: preloadassets,
        assets: assets
    };
});