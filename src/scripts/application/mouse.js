define(['eventmanager'], function (eventmanager) {

    // This snippet gives back some nice canvas relative coordinates
    HTMLCanvasElement.prototype.relmouseCoordinates = function (event) {
        var currentElement = this;
        var rect = currentElement.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    };
    window.oncontextmenu = function (event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    };
    var init = function () {

    };
    eventmanager.subscribe('game.init', function () {
        init();
    });


});