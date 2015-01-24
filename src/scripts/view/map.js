define([
        'eventmanager',
        'canvas',
        'world',
        'standardlib',
        'assets',
        'RNG',
        'underscore',
        'jQuery'
    ],
    function (eventmanager, canvas, world, standardlib, assets, RNG) {
        var visible = {x: 10, y: 10};
        var centerCoordinates = {x: 10, y: 10};
        var pressedkeys = {
            up: 0,
            down: 0,
            left: 0,
            right: 0
        };

        function init() {
            draw();
            center(centerCoordinates.x, centerCoordinates.y);
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
                                posX: coordinates.x + j,
                                posY: coordinates.y + i
                            });
                        } else {
                            drawTile({
                                sprite: "landscapeTiles_067.png",
                                posX: coordinates.x + j,
                                posY: coordinates.y + i
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
            coordinates = standardlib.twoDToIso(config.posX, config.posY);
            // transform the coordinates to the actual size of the map
            coordinates.x = (coordinates.x * world.tileWidth + ((canvas.terrain.canvas.width) / 2)) - ((spt.w - world.tileWidth) / 2) - world.tileWidth / 2;
            coordinates.y = coordinates.y * world.tileHeight + (spt.w / 2 - spt.h);

            canvas.terrain.context.drawImage(
                img,
                spt.x, spt.y,
                spt.w, spt.h,
                coordinates.x,
                coordinates.y,
                spt.w,
                spt.h);
        }

        function center(posX, posY) {
            // transform the grid tile to iso coordinates
            var coordinates = standardlib.twoDToIso(posX, posY);
            // transform the coordinates to the actual size of the map
            coordinates.x = -((coordinates.x - visible.x) * world.tileWidth + ((canvas.terrain.canvas.width) / 2));
            coordinates.y = -((coordinates.y - visible.y) * world.tileHeight + world.tileHeight / 2);
            $(canvas.terrain.canvas).css('margin-left', coordinates.x).css('marginTop', coordinates.y);
        }

        function update() {
            var inbound = {x: 0, y: 0};
            if (pressedkeys.up === 1) {
                inbound.y--;
                inbound.x--;
            }
            if (pressedkeys.down === 1) {
                inbound.y++;
                inbound.x++;
            }
            if (pressedkeys.left === 1) {
                inbound.x--;
                inbound.y++;
            }
            if (pressedkeys.right === 1) {
                inbound.x++;
                inbound.y--;
            }
            // Only update the map position if there is a change.
            if (inbound.x !== 0 || inbound.y !== 0) {
                inbound = world.inBoundTile(centerCoordinates.x + inbound.x, centerCoordinates.y + inbound.y);
                center(inbound.x, inbound.y);
                centerCoordinates.x = inbound.x;
                centerCoordinates.y = inbound.y;
            }
        }

        eventmanager.subscribe('game.init', function () {
            init();
        });
        eventmanager.subscribe('new.frame', function () {
            update();
        });
        eventmanager.subscribe('pan.up', function (e) {
            pressedkeys.up = e;
        });
        eventmanager.subscribe('pan.down', function (e) {
            pressedkeys.down = e;
        });
        eventmanager.subscribe('pan.left', function (e) {
            pressedkeys.left = e;
        });
        eventmanager.subscribe('pan.right', function (e) {
            pressedkeys.right = e;
        });
    });
