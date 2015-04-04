define(['lodash', 'jquery', 'plane', 'assetLoader', 'eventmanager', 'gamecycle', 'animate', 'input'], function (lodash, jquery,plane, assetLoader, eventmanager) {

    assetLoader.preloadassets();
    var player1 = plane({coordinates: {x: 3960, y: 100}}).init();
    var player2 = plane({coordinates: {x: 4000, y: 200}}).init();

});