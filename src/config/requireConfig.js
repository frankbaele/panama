require.config({
    paths: {
        text: 'bower_components/text/text',
        assetsList: 'config/assetsList.json',
        RNG: 'scripts/application/libs/RNG',
        world: 'scripts/application/libs/world',
        collisionGrid: 'scripts/application/collisionGrid',
        spriteSheet: 'scripts/application/libs/spriteSheet',
        standardlib: 'scripts/application/libs/standardLibrary',
        RequestAnimationFrame: 'scripts/application/libs/RequestAnimationFrame',
        assetLoader: 'scripts/application/assetLoader',
        center: 'scripts/application/center',
        keys: 'scripts/application/keys',
        mouse: 'scripts/application/mouse',
        gamecycle: 'scripts/application/gamecycle',
        actorMovement: 'scripts/logic/actorMovement',
        eventmanager: 'scripts/logic/Mediator',
        command: 'scripts/logic/command',
        commandQueue: 'scripts/logic/commandQueue',
        player: 'scripts/logic/player',
        actorList: 'scripts/logic/actorList',
        plane: 'scripts/logic/actors/plane',
        actor: 'scripts/logic/actors/actor',
        'actor.unit': 'scripts/logic/actors/actor.unit',
        'actor.unit.local': 'scripts/logic/actors/actor.unit.local',
        animate: 'scripts/view/animate',
        input: 'scripts/view/input',
        map: 'scripts/view/map',
        actors: 'scripts/view/actors',
        Keypress: 'bower_components/Keypress/keypress-2.1.0.min',
        jquery: 'bower_components/jquery/dist/jquery',
        q: 'bower_components/q/q',
        lodash: 'bower_components/lodash/lodash',
        PF: 'bower_components/pathfinding/pathfinding-browser',
        steer: 'bower_components/steer.js/bin/steer',
        box2d: 'bower_components/steer.js/src/box2d'
    },
    shim: {
        box2d: {
            exports: 'box2d'
        }
    }
});
