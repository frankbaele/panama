define(['text!config/AssetsList.json', 'AssetLoader'], function (AssetList, AssetLoader) {
  var assets = {
    config: {},
    loaded : {
      atlas : [],
      music : []
    }
  };
  // Load the Asset list;
  assets.config = JSON.parse(AssetList);
  assets = AssetLoader.preloadAssets(assets);
  return assets;
});