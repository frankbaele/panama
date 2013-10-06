var assets = {
    mapTiles: {
        type: "atlas",
        configuration: "./art/panama.json",
        file: "./art/panama.png"
    }
};

var AssetLoaderConstructor = function () {
    this.queue = 0;
};

AssetLoaderConstructor.prototype.preloadAssets = function () {
    var that = this;
    // loop through the asset object and load each asset file
    _.forEach(assets, function (asset) {
        that.queue++;
        switch (asset.type) {
            case 'atlas':
                that.loadAtlas(asset);
                break;

            case 'music':
                break;
        }
    });
};

AssetLoaderConstructor.prototype.preloadComplete = function () {
    return this.queue > 0 ? false : true;
};
AssetLoaderConstructor.prototype.loadAtlas = function (data) {
    var confRequest = jQuery.getJSON(data.configuration);

};

var assetLoader = new AssetLoaderConstructor();
