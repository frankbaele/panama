require.config({
  baseUrl: 'scripts',
  paths: {
    // the left side is the module ID,
    // the right side is the path to
    // the jQuery file, relative to baseUrl.
    // Also, the path should NOT include
    // the '.js' file extension. This example
    // is using jQuery 1.9.0 located at
    // js/lib/jquery-1.9.0.js, relative to
    // the HTML page.
    /* VENDORS */
    jQuery: 'vendor/jquery-2.0.3.min',
    underscore: 'vendor/lodash.min',
    text: 'vendor/require.text',
    keypress: 'vendor/keypress',
    /* libs */
    RNG: 'application/libs/RNG',
    World: 'application/libs/World',
    Graph: 'application/libs/Graph',
    GraphNode: 'application/libs/GraphNode',
    BinaryHeap: 'application/libs/BinaryHeap',
    SpriteSheet: 'application/libs/SpriteSheet',
    STL: 'application/libs/StandardLibrary',
    RequestAnimationFrame: 'application/libs/RequestAnimationFrame',
    /* application */
    AssetLoader: 'application/AssetLoader',
    Assets : 'application/Assets',
    Canvas : 'application/Canvas',
    Keys : 'application/Keys',
    Mouse : 'application/Mouse',
    /* Config */
    config : '../config',
    /* logic */
    EventManager: 'view/Mediator',
    /* view */
    Animate: 'view/Animate',
    Input: 'view/Input',
    Map: 'view/Map',
    Sprite: 'view/Sprite'
  }
});