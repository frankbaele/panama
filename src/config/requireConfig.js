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
    AssetsList: 'config/AssetsList.json',
    /* libs */
    RNG: 'scripts/application/libs/RNG',
    Astar: 'scripts/application/libs/Astar',
    World: 'scripts/application/libs/World',
    Graph: 'scripts/application/libs/Graph',
    GraphNode: 'scripts/application/libs/GraphNode',
    BinaryHeap: 'scripts/application/libs/BinaryHeap',
    SpriteSheet: 'scripts/application/libs/SpriteSheet',
    STL: 'scripts/application/libs/StandardLibrary',
    RequestAnimationFrame: 'scripts/application/libs/RequestAnimationFrame',
    /* application */
    AssetLoader: 'scripts/application/AssetLoader',
    Assets : 'scripts/application/Assets',
    Canvas : 'scripts/application/Canvas',
    Keys : 'scripts/application/Keys',
    Mouse : 'scripts/application/Mouse',
    /* Config */
    config : '../config',
    /* logic */
    EventManager: 'scripts/logic/Mediator',
    Command: 'scripts/logic/command',
    CommandQueue: 'scripts/logic/commandQueue',
    /* Actors */
    ActorList: 'scripts/logic/ActorList',
    actor: 'scripts/logic/actors/actor',
    'actor.unit': 'scripts/logic/actors/actor.unit',
    'actor.unit.ai': 'scripts/logic/actors/actor.unit.ai',
    'actor.unit.ai.enemy': 'scripts/logic/actors/actor.unit.ai.enemy',
    'actor.unit.human': 'scripts/logic/actors/actor.unit.human',
    'actor.unit.human.local': 'scripts/logic/actors/actor.unit.human.local',
    'actor.unit.human.remote': 'scripts/logic/actors/actor.unit.human.remote',
    /* view */
    Animate: 'scripts/view/Animate',
    Input: 'scripts/view/Input',
    Map: 'scripts/view/Map',
    Sprite: 'scripts/view/Sprite',
    Actors: 'scripts/view/Actors'
  }
});