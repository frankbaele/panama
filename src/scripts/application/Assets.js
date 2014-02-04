define(['text!AssetsList', 'AssetLoader', 'EventManager'], function (AssetList, AssetLoader, eventManager) {
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

  function checkAssetLoader() {
    var tev = setInterval(function () {
      if (AssetLoader.preloadComplete()) {
        eventManager.publish('assets.loaded');
        clearInterval(tev);
      }
    }, 1000);
  };

  checkAssetLoader();
  return assets;
});