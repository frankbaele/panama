define(['lodash', 'jquery', 'plane', 'assetLoader', 'eventmanager', 'gamecycle', 'animate', 'input'], function (lodash, jquery,plane, assetLoader, eventmanager) {

    var promises = assetLoader.preloadassets();
    plane({coordinates: {x: 30, y: 30}}).init();
    plane({coordinates: {x: 29, y: 30}}).init();
    plane({coordinates: {x: 31, y: 30}}).init();
    plane({coordinates: {x: 30, y: 29}}).init();
    plane({coordinates: {x: 30, y: 31}}).init();
    plane({coordinates: {x: 33, y: 30}}).init();
    plane({coordinates: {x: 29, y: 31}}).init();
    plane({coordinates: {x: 31, y: 31}}).init();
    plane({coordinates: {x: 30, y: 28}}).init();

});