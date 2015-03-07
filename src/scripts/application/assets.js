define(['text!assetsList', 'assetLoader', 'eventmanager'], function (AssetList, assetLoader, eventmanager) {
    var assets = {
        config: {},
        loaded: {
            atlas: [],
            music: []
        }
    };



    assets.load = function(callback){
        // Load the Asset list;
        assets.config = JSON.parse(AssetList);
        var assetDefers = assetLoader.preloadassets(assets);
        $.when(assetDefers).then(function () {
            callback();
        });
    };
    return assets;
});