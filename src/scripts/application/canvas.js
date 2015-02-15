define(['eventmanager', 'world', 'standardlib'], function (eventmanager, world, standardlib) {
    var terrain = {};
    var init = function () {
        terrain.canvas = document.getElementById("mapCanvas");
        terrain.context = terrain.canvas.getContext("2d");
        terrain.canvas.width = world.width * world.tileWidth + world.padding.x * 2;
        terrain.canvas.height = world.height * world.tileHeight + world.padding.y * 2;
        terrain.canvas.addEventListener("contextmenu",
            function (e) {
                var coordinates = terrain.canvas.relmouseCoordinates(e);
                coordinates = standardlib.worldPosToGridPos(coordinates.x, coordinates.y, terrain.canvas.width);
                eventmanager.publish('map.click', coordinates)
            },
            false
        );
    };

    eventmanager.subscribe('game.init', function () {
        init();
    });
    return {
        terrain: terrain
    };
});