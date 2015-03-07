require.config({
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
    jQuery: 'scripts/vendor/jquery-2.0.3.min',
    underscore: 'scripts/vendor/lodash.min',
    text: 'scripts/vendor/require.text',
    keypress: 'scripts/vendor/keypress',
    /* config */
    assetsList: 'config/assetsList.json',
    /* libs */
    RNG: 'scripts/application/libs/RNG',
    astar: 'scripts/application/libs/astar',
    world: 'scripts/application/libs/world',
    collisionGrid: 'scripts/application/collisionGrid',
    graph: 'scripts/application/libs/graph',
    graphNode: 'scripts/application/libs/graphNode',
    binaryHeap: 'scripts/application/libs/binaryHeap',
    spriteSheet: 'scripts/application/libs/spriteSheet',
    standardlib: 'scripts/application/libs/standardLibrary',
    RequestAnimationFrame: 'scripts/application/libs/RequestAnimationFrame',
    /* application */
    assetLoader: 'scripts/application/assetLoader',
    assets : 'scripts/application/assets',
    keys : 'scripts/application/keys',
    mouse : 'scripts/application/mouse',
    gamecycle : 'scripts/application/gamecycle',
    /* Config */
    config : '../config',
    /* logic */
    eventmanager: 'scripts/logic/Mediator',
    command: 'scripts/logic/command',
    commandQueue: 'scripts/logic/commandQueue',
    /* Actors */
    'player': 'scripts/logic/player',
    actorList: 'scripts/logic/actorList',
    plane: 'scripts/logic/actors/plane',
    actor: 'scripts/logic/actors/actor',
    'actor.unit': 'scripts/logic/actors/actor.unit',
    'actor.unit.local': 'scripts/logic/actors/actor.unit.local',
    /* view */
    animate: 'scripts/view/animate',
    input: 'scripts/view/input',
    map: 'scripts/view/map',
    actors: 'scripts/view/actors'
  },
  shim: {
    'jQuery': {
      'exports' : 'jQuery'
    },
    'underscore': {
      exports: '_'
    }
  }
});
require( ['scripts/app']);