require.config({
    paths: {
        assetsList: 'config/assetsList.json',
        world: 'scripts/application/world',
        collisionGrid: 'scripts/application/collision',
        spriteSheet: 'scripts/application/spriteSheet',
        animate: 'scripts/application/animate',
        input: 'scripts/application/input',
        standardlib: 'scripts/application/standardLibrary',
        RequestAnimationFrame: 'scripts/application/RequestAnimationFrame',
        assetLoader: 'scripts/application/assetLoader',
        mapLoader: 'scripts/application/mapLoader',
        center: 'scripts/application/center',
        keys: 'scripts/application/keys',
        mouse: 'scripts/application/mouse',
        gamecycle: 'scripts/application/gamecycle',
        actorMovement: 'scripts/logic/actors/actor.pathfinding',
        eventmanager: 'scripts/logic/Mediator',
        command: 'scripts/logic/command',
        commandQueue: 'scripts/logic/commandQueue',
        player: 'scripts/logic/player',
        actorList: 'scripts/logic/actorList',
        plane: 'scripts/logic/units/plane',
        actor: 'scripts/logic/actors/actor',
        'actor.unit': 'scripts/logic/actors/actor.unit',
        'actor.unit.local': 'scripts/logic/actors/actor.unit.local',
        map: 'scripts/view/map',
        actors: 'scripts/view/actors',
        Keypress: '../../bower_components/Keypress/keypress-2.1.0.min',
        jquery: '../../bower_components/jquery/dist/jquery',
        lodash: '../../bower_components/lodash/lodash',
        pathfinding: '../../bower_components/pathfinding/pathfinding-browser.min',
        q: '../../bower_components/q/q',
        text: '../../bower_components/text/text',
        polymer: '../../bower_components/polymer/polymer',
        rvo: '../../bower_components/rvo/index',
        pixi: '../../bower_components/pixi.js/bin/pixi'
    },
    shim: {
        rvo: {
            exports: 'RVO'
        }
    },
    packages: [

    ]
});
