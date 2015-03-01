define([
        'eventmanager',
        'world',
        'standardlib',
        'assets',
        'underscore',
        'jQuery'
    ],
    function (eventmanager, world, standardlib, assets) {
        var terrain = {};

        function init() {
            terrain.canvas = document.getElementById("mapCanvas");
            terrain.context = terrain.canvas.getContext("2d");
            terrain.canvas.width = world.width * world.tileWidth;
            terrain.canvas.height = world.height * world.tileHeight;
            terrain.canvas.addEventListener("click",
                function (e) {
                    var coordinates = terrain.canvas.relmouseCoordinates(e);
                    coordinates = standardlib.worldPosToGridPos(coordinates.x, coordinates.y);
                    eventmanager.publish('map.click', coordinates);
                }
            );
            terrain.canvas.addEventListener('mousedown', function (event) {

                if (event.which == 1) {
                    $(".ghost-select").addClass("ghost-active");
                    $(".ghost-select").css({
                        'left': event.pageX,
                        'top': event.pageY
                    });

                    initialW = event.pageX;
                    initialH = event.pageY;

                    $(document).bind("mouseup", defineSelection);
                    $(document).bind("mousemove", updateSelector);
                }

            });
            // Listen to the window for the release, otherwise we have a release when leaving the map canvas.
            draw();
            center();
        }

        // Calculate the selection and reset the selection box.
        function defineSelection(e) {
            $(document).unbind("mousemove", updateSelector);
            $(document).unbind("mouseup", defineSelection);

            var element = $(".ghost-select");

            eventmanager.publish('map.selection', {
                width: element.width(),
                height: element.height(),
                left: element.offset().left,
                top: element.offset().top
            });
            //Reset the selection div.
            $(".ghost-select").css({
                'left': 0,
                'top': 0,
                'width': 0,
                'height': 0
            }).removeClass("ghost-active");
        }

        // Update the selection box with the new width and height based on placement of the cursor
        function updateSelector(e) {
            var w = Math.abs(initialW - e.pageX);
            var h = Math.abs(initialH - e.pageY);
            $(".ghost-select").css({
                'width': w,
                'height': h
            });
            if (e.pageX <= initialW && e.pageY >= initialH) {
                $(".ghost-select").css({
                    'left': e.pageX
                });
            } else if (e.pageY <= initialH && e.pageX >= initialW) {
                $(".ghost-select").css({
                    'top': e.pageY
                });
            } else if (e.pageY < initialH && e.pageX < initialW) {
                $(".ghost-select").css({
                    'left': e.pageX,
                    "top": e.pageY
                });
            }
        }

        function draw() {
            terrain.context.clearRect(0, 0, terrain.canvas.width, terrain.canvas.height);
            var coordinates = {x: 0, y: 0};
            for (var i = 0; world.height > i; i++) {
                for (var j = 0; world.width > j; j++) {
                    if (!world.outOfBound(coordinates.y + i, coordinates.x + j)) {
                        if (world.mapData[coordinates.y + i][coordinates.x + j] === 1) {
                            drawTile({
                                sprite: "trees_2.png",
                                x: coordinates.x + j,
                                y: coordinates.y + i,
                                correction: 15
                            });
                        } else {
                            drawTile({
                                sprite: "landscapeTiles_066.png",
                                x: coordinates.x + j,
                                y: coordinates.y + i,
                                correction: 15
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
            coordinates.x = (coordinates.x * world.tileWidth + ((terrain.canvas.width) / 2)) - ((spt.w - world.tileWidth) / 2) - world.tileWidth / 2;
            coordinates.y = (coordinates.y * world.tileHeight + (spt.w / 2 - (spt.h - config.correction)));

            terrain.context.drawImage(
                img,
                spt.x, spt.y,
                spt.w, spt.h,
                coordinates.x,
                coordinates.y,
                spt.w,
                spt.h);
        }

        function center() {
            var xCorrection = window.innerWidth / 2;
            var yCorrection = window.innerHeight / 2;

            // transform the grid tile to iso coordinates
            var coordinates = {};
            // transform the coordinates to the actual size of the map
            coordinates.x = -((world.center.x) * world.tileWidth + ((terrain.canvas.width) / 2) - xCorrection);
            coordinates.y = -(((world.center.y) * world.tileHeight)) + yCorrection;
            $(terrain.canvas).css('margin-left', coordinates.x).css('margin-top', coordinates.y);
        }

        function update() {
            center(world.center);
        }

        eventmanager.subscribe('new.frame', function () {
            update();
        });
        eventmanager.subscribe('game.init', function () {
            init();
        });
    });
