define([
        'eventmanager',
        'canvas',
        'world',
        'standardlib',
        'assets',
        'underscore',
        'jQuery'
    ],
    function (eventmanager, canvas, world, standardlib, assets) {

        function init() {
            draw();
            center();
        }

        function draw() {
            canvas.terrain.context.clearRect(0, 0, canvas.terrain.canvas.width, canvas.terrain.canvas.height);
            var coordinates = {x: 0, y: 0};
            for (var i = 0; world.height > i; i++) {
                for (var j = 0; world.width > j; j++) {
                    if (!world.outOfBound(coordinates.y + i, coordinates.x + j)) {
                        if (world.mapData[coordinates.y + i][coordinates.x + j] === 1) {
                            drawTile({
                                sprite: "trees_2.png",
                                x: coordinates.x + j,
                                y: coordinates.y + i
                            });
                        } else {
                            drawTile({
                                sprite: "landscapeTiles_067.png",
                                x: coordinates.x + j,
                                y: coordinates.y + i
                            });
                        }
                    }
                }
            }
        }
        function drawTile(config) {
            var spt,
                coordinates,
                img;
            // For lop trough all the atlasses with find, because we want to exit this loop when the atlas is found.
            _.findIndex(assets.loaded.atlas, function (sheet) {
                // Search for a sprite with the same sprite name
                spt = _.findWhere(sheet.sprite.sprites, {id: config.sprite});
                img = sheet.sprite.img;
                // exit find loop when sprite is found.
                if (!_.isEmpty(sheet)) {
                    return;
                }
            });
            if (_.isEmpty(spt)) {
                return;
            }

            // transform the grid tile to iso coordinates
            coordinates = standardlib.twoDToIso(config.x, config.y);
            // transform the coordinates to the actual size of the map
            coordinates.x = (coordinates.x * world.tileWidth + ((canvas.terrain.canvas.width) / 2)) - ((spt.w - world.tileWidth) / 2) - world.tileWidth / 2;
            coordinates.y = world.padding.y + coordinates.y * world.tileHeight + (spt.w / 2 - spt.h);

            canvas.terrain.context.drawImage(
                img,
                spt.x, spt.y,
                spt.w, spt.h,
                coordinates.x,
                coordinates.y,
                spt.w,
                spt.h);
        }

        function center() {
            var xCorrection =  window.innerWidth/2;
            var yCorrection = window.innerHeight/2;

            // transform the grid tile to iso coordinates
            var coordinates = {};
            // transform the coordinates to the actual size of the map
            coordinates.x = -((world.center.x) * world.tileWidth + ((canvas.terrain.canvas.width) / 2) - xCorrection);
            coordinates.y = -((world.center.y + 1) * world.tileHeight) + yCorrection;
            $(canvas.terrain.canvas).css('margin-left', coordinates.x).css('margin-top', coordinates.y);
        }

        function update(){
            center(world.center);
        }
        eventmanager.subscribe('new.frame', function () {
            update();
        });
        eventmanager.subscribe('game.init', function () {
            init();
        });
    });
