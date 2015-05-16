define(['assetLoader', 'eventmanager', 'mapLoader'], function (assetLoader, eventmanager, mapLoader) {
    mapLoader.load('test')
        .then(assetLoader.preloadassets)
        .then(function(){
            require(['collisionGrid']);
        })
        .then(function () {
            require(['gamecycle', 'animate', 'input', 'plane'], function(){
                eventmanager.publish('game.init');
                var plane = require('plane');
                var player1 = plane({coordinates: {x: 1980, y: 150}}).init();
            });
        });
});
