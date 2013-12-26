define(['Animate', 'STL', 'Assets', 'AssetLoader'], function (animate, stl, assets, assetLoader) {
  function init() {
    animate.init();
    gameCycle();
  }

  function gameCycle() {
    // Call next cycle.
    setTimeout(gameCycle, 200);
    // Execute the previous cycle Commands.
    excuteCycle();
    // Generate commands to executed next cycle.
    //cycle++;
  }
  function excuteCycle(){

  }
  console.log(assetLoader.preloadComplete());
  stl.checkWait(
    assetLoader.preloadComplete,
    init
  );
});
