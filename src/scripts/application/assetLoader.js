define(['spriteSheet', 'text!assetsList', 'q', 'eventmanager'], function (spriteSheet, assetsList, Q, eventmanager) {
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

            switch (asset.type) {
                case 'atlas':
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
                                eventmanager.publish('game.init');
                            };
                        }
                    );

                    break;
                case 'music':
                    break;
            }
        });
    };

    return {
        preloadassets: preloadassets,
        assets: assets
    };
});