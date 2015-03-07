define(['spriteSheet', 'text!assetsList', 'q'], function (spriteSheet, assetsList, Q) {
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
        // loop through the asset object and load each asset file
        _.forEach(assets.config, function (asset) {
            var deferred = Q.defer();
            switch (asset.type) {
                case 'atlas':
                    loadAtlas(asset, function (loadedAsset) {
                        // now put all the loaded data in a spriteSheet object and inject it into the loaded atlas array.
                        assets.loaded.atlas.push({
                            name: asset.name,
                            sprite: new spriteSheet(loadedAsset.configuration, loadedAsset.file)
                        });
                        deferred.resolve();
                    });
                    break;
                case 'music':
                    break;
            }
            defers.push(deferred);
        });
        return Q.all(defers);
    };

    var loadAtlas = function (asset, callback) {
        // first get the configuration over json en then load the image object.
        jQuery.getJSON(asset.configuration, function (data) {
            asset.configuration = data;
        }).then(function () {
                var img = new Image();
                img.src = asset.file;
                img.onload = function(){
                    asset.file = img;
                    callback(asset);
                };

            }
        );
    };

    return {
        preloadassets: preloadassets,
        loadAtlas: loadAtlas,
        assets: assets
    };
});