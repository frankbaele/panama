var AssetLoaderConstructor = function () {
  var complete = false;
};

AssetLoaderConstructor.prototype.preloadAssets = function () {
  console.log(this.complete);
  this.complete = true;
};

AssetLoaderConstructor.prototype.preloadComplete = function () {
  console.log(this.complete);
  return this.complete;
};

var assetLoader = new AssetLoaderConstructor();