define(['lodash', 'jquery', 'standardlib', 'plane', 'assetLoader', 'eventmanager', 'mapLoader', 'gamecycle', 'animate', 'input'], function (lodash, jquery, stl, plane, assetLoader, eventmanager, mapLoader) {
    mapLoader.load('test')
        .then(assetLoader.preloadassets)
        .then(function () {
            eventmanager.publish('game.init');
            var player1 = plane({coordinates: {x: 3960, y: 0}}).init();
            var player2 = plane({coordinates: {x: 4000, y: 200}}).init();
            var player2 = plane({coordinates: {x: 4020, y: 200}}).init();
            var player2 = plane({coordinates: {x: 4040, y: 200}}).init();
            var player2 = plane({coordinates: {x: 4050, y: 200}}).init();
            var player2 = plane({coordinates: {x: 4060, y: 200}}).init();
            var player2 = plane({coordinates: {x: 4070, y: 200}}).init();
        });
});
