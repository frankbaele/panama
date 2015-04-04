define(['lodash', 'jquery', 'plane', 'assetLoader', 'eventmanager', 'gamecycle', 'animate', 'input'], function (lodash, jquery,plane, assetLoader, eventmanager) {

    assetLoader.preloadassets();
    var player1 = plane({coordinates: {x: 3960, y: 0}}).init();
    var player2 = plane({coordinates: {x: 4000, y: 200}}).init();
    var player3 = plane({coordinates: {x: 4100, y: 200}}).init();
    var player4 = plane({coordinates: {x: 4200, y: 200}}).init();
    var player5 = plane({coordinates: {x: 4300, y: 200}}).init();
    var player6 = plane({coordinates: {x: 4400, y: 200}}).init();

});