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
    angular: 'scripts/vendor/angular.min',
    'angular-ui-router': 'scripts/vendor/angular-ui-router.min',
    /* config */
    assetsList: 'config/assetsList.json',
    /* libs */
    RNG: 'scripts/application/libs/RNG',
    astar: 'scripts/application/libs/astar',
    world: 'scripts/application/libs/world',
    graph: 'scripts/application/libs/graph',
    graphNode: 'scripts/application/libs/graphNode',
    binaryHeap: 'scripts/application/libs/binaryHeap',
    spriteSheet: 'scripts/application/libs/spriteSheet',
    standardlib: 'scripts/application/libs/standardLibrary',
    RequestAnimationFrame: 'scripts/application/libs/RequestAnimationFrame',
    /* application */
    assetLoader: 'scripts/application/assetLoader',
    assets : 'scripts/application/assets',
    canvas : 'scripts/application/canvas',
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
    actor: 'scripts/logic/actors/actor',
    'actor.unit': 'scripts/logic/actors/actor.unit',
    'actor.unit.ai': 'scripts/logic/actors/actor.unit.ai',
    'actor.unit.ai.enemy': 'scripts/logic/actors/actor.unit.ai.enemy',
    'actor.unit.human': 'scripts/logic/actors/actor.unit.human',
    'actor.unit.human.local': 'scripts/logic/actors/actor.unit.human.local',
    'actor.unit.human.remote': 'scripts/logic/actors/actor.unit.human.remote',
    /* view */
    animate: 'scripts/view/animate',
    input: 'scripts/view/input',
    map: 'scripts/view/map',
    sprite: 'scripts/view/sprite',
    actors: 'scripts/view/actors',
    /* app */
    app : 'scripts/app'
  },
  shim: {
    'angular' : {
      'exports' : 'angular'
    },
    'angular-ui-router': {
      deps:['angular']
    },
    'jQuery': {
      'exports' : 'jQuery'
    },
    'underscore': {
      exports: '_'
    }
  },
  deps:['angular', 'app','player', 'gamecycle', 'assets', 'animate', 'input']
});