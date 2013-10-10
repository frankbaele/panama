var assets = {
  config: {
    mapTiles: {
      type: "atlas",
      configuration: "./art/panama.json",
      file: "./art/panama.png"
    }
  },
  loaded : {
    atlas : [],
    music : []
  }
};

var AssetLoaderConstructor = function () {
  this.queue = 0;
};

AssetLoaderConstructor.prototype.preloadAssets = function () {
  var that = this;
  // loop through the asset object and load each asset file
  _.forEach(assets.config, function (asset) {
    that.queue++;
    switch (asset.type) {
      case 'atlas':
        that.loadAtlas(asset, function (loadedAsset) {
          assets.loaded.atlas.push(loadedAsset);
          that.queue--;
        });
        break;

      case 'music':
        break;
    }
  });
};

AssetLoaderConstructor.prototype.preloadComplete = function () {
  return this.queue > 0 ? false : true;
};
AssetLoaderConstructor.prototype.loadAtlas = function (asset, callback) {

  jQuery.getJSON(asset.configuration,function (data) {
    asset.configuration = data;
  }).then(function () {
      var img = new Image();
      img.src = asset.file;
      asset.file = img;
      callback(asset)
    }
  );
};

var assetLoader = new AssetLoaderConstructor();
