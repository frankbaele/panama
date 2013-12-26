define(['SpriteSheet', 'underscore', 'jQuery'], function (SpriteSheet) {
  var queue = 0;

  var preloadAssets = function (Assets) {
    var that = this;
    // loop through the asset object and load each asset file
    _.forEach(Assets.config, function (asset) {
      that.queue++;
      switch (asset.type) {
        case 'atlas':
          that.loadAtlas(asset, function (loadedAsset) {
            // now put all the loaded data in a spritesheet object and inject it into the loaded atlas array.
            Assets.loaded.atlas.push({
              name: asset.name,
              sprite: new SpriteSheet(loadedAsset.configuration, loadedAsset.file)
            });
            that.queue--;
          });
          break;

        case 'music':
          break;
      }
    });
    return Assets;
  };

  var preloadComplete = function () {
    return this.queue > 0 ? false : true;
  };

  var loadAtlas = function (asset, callback) {
    // first get the configuration over json en then load the image object.
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

  return {
    preloadAssets : preloadAssets,
    preloadComplete : preloadComplete,
    loadAtlas: loadAtlas
  };
});