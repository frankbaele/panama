define(['text!assetsList', 'assetLoader', 'eventmanager'], function (AssetList, assetLoader, eventmanager) {
  var assets = {
    config: {},
    loaded : {
      atlas : [],
      music : []
    }
  };
  // Load the Asset list;
  assets.config = JSON.parse(AssetList);
  assets = assetLoader.preloadassets(assets);

  function checkassetLoader() {
    var tev = setInterval(function () {
      if (assetLoader.preloadComplete()) {
        eventmanager.publish('assets.loaded');
        clearInterval(tev);
      }
    }, 1000);
  };

  checkassetLoader();
  return assets;
});