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
                var player1 = plane({coordinates: {x: 1980, y: 250}}).init();

                var player2 = plane({coordinates: {x: 1980, y: 230}}).init();
                var player3 = plane({coordinates: {x: 1980, y: 230}}).init();
                var player4 = plane({coordinates: {x: 1980, y: 230}}).init();
                var player5 = plane({coordinates: {x: 1980, y: 230}}).init();
                var player6 = plane({coordinates: {x: 1980, y: 230}}).init();
                var player7 = plane({coordinates: {x: 1980, y: 250}}).init();
                var player8 = plane({coordinates: {x: 1980, y: 260}}).init();

            });
        });
});
