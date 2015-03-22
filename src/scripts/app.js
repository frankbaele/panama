define(['lodash', 'jquery', 'plane', 'assetLoader', 'eventmanager', 'gamecycle', 'animate', 'input'], function (lodash, jquery,plane, assetLoader, eventmanager) {

    assetLoader.preloadassets();
    plane({coordinates: {x: 3960, y: 1980}}).init();

});