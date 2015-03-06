define(['text!assetsList', 'assetLoader', 'eventmanager'], function (AssetList, assetLoader, eventmanager) {
    var assets = {
        config: {},
        loaded: {
            atlas: [],
            music: []
        }
    };
    // Load the Asset list;
    assets.config = JSON.parse(AssetList);
    var assetDefers = assetLoader.preloadassets(assets)
    $.when(function (assetDefers) {
        eventmanager.publish('assets.loaded');
    });

    return assets;
});