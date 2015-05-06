define([
        'eventmanager',
        'world',
        'standardlib',
        'center',
        'assetLoader'
    ],
    function (eventmanager, world, standardlib, center, assetLoader) {
        var terrain = {};

        function init() {
            terrain.canvas = app.config.shadowRoot.getElementById("mapCanvas");
            terrain.context = terrain.canvas.getContext("2d");
            terrain.canvas.width = app.config.terrain.grid.width * app.config.terrain.tile.width;
            terrain.canvas.height = app.config.terrain.grid.height * app.config.terrain.tile.height;
            terrain.canvas.addEventListener("contextmenu",
                function (e) {
                    var coordinates = terrain.canvas.relmouseCoordinates(e);
                    eventmanager.publish('map.click', coordinates);
                }
            );
            terrain.canvas.addEventListener('mousedown', function (event) {
                if (event.which == 1) {
                    $(app.config.shadowRoot).find("#ghost-select").addClass("ghost-active");
                    $(app.config.shadowRoot).find("#ghost-select").css({
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
            centerMap();
        }

        // Calculate the selection and reset the selection box.
        function defineSelection(e) {
            $(document).unbind("mousemove", updateSelector);
            $(document).unbind("mouseup", defineSelection);

            var element = app.config.shadowRoot.getElementById('ghost-select');
            eventmanager.publish('map.selection', {
                width: element.offsetWidth,
                height: element.offsetHeight,
                left: element.offsetLeft,
                top: element.offsetTop

            });
            //Reset the selection div.
            $(app.config.shadowRoot).find("#ghost-select").css({
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
            $(app.config.shadowRoot).find("#ghost-select").css({
                'width': w,
                'height': h
            });
            if (e.pageX <= initialW && e.pageY >= initialH) {
                $(app.config.shadowRoot).find("#ghost-select").css({
                    'left': e.pageX
                });
            } else if (e.pageY <= initialH && e.pageX >= initialW) {
                $(app.config.shadowRoot).find("#ghost-select").css({
                    'top': e.pageY
                });
            } else if (e.pageY < initialH && e.pageX < initialW) {
                $(app.config.shadowRoot).find("#ghost-select").css({
                    'left': e.pageX,
                    "top": e.pageY
                });
            }
        }

        function draw() {
            terrain.context.clearRect(0, 0, terrain.canvas.width, terrain.canvas.height);
            var coordinates = {x: 0, y: 0};
            for (var i = 0; i < world.grid.length; i++) {
                for (var j = 0; j < world.grid[0].length; j++) {
                    if (world.grid[coordinates.y+j][coordinates.x+i] === 1) {
                        drawTile({
                            sprite: "details/trees_2.png",
                            x: coordinates.x + j,
                            y: coordinates.y + i,
                            correction: 15
                        });
                    } else {
                        drawTile({
                            sprite: "landscape/landscapeTiles_066.png",
                            x: coordinates.x + j,
                            y: coordinates.y + i,
                            correction: 15
                        });
                    }
                }
            }
        }

        function drawTile(config) {
            var spt,
                coordinates,
                img;
            // For lop trough all the atlasses with find, because we want to exit this loop when the atlas is found.
            _.findIndex(assetLoader.assets.loaded.atlas, function (sheet) {
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
            coordinates = standardlib.twoDToIso({x:config.x, y:config.y});
            // transform the coordinates to the actual size of the map
            coordinates.x = (coordinates.x * app.config.terrain.tile.width + ((terrain.canvas.width) / 2))  - app.config.terrain.tile.width / 2;
            coordinates.y = (coordinates.y * app.config.terrain.tile.height + (spt.w / 2 - (spt.h - config.correction)));
            terrain.context.drawImage(
                img,
                spt.x, spt.y,
                spt.w, spt.h,
                coordinates.x,
                coordinates.y,
                spt.w,
                spt.h);
        }

        function centerMap() {
            var xCorrection = window.innerWidth / 2;
            var yCorrection = window.innerHeight / 2;
            // transform the grid tile to iso coordinates
            var coordinates = {};
            // transform the coordinates to the actual size of the map

            coordinates.x = -(center.x * app.config.actor.tile.width + ((terrain.canvas.width) / 2) - xCorrection);
            coordinates.y = -((center.y + (app.config.terrain.tile.height/app.config.actor.tile.height)) * app.config.actor.tile.height) + yCorrection;
            $(app.config.shadowRoot).find(terrain.canvas).css('margin-left', coordinates.x).css('margin-top', coordinates.y);
        }

        function update() {
            centerMap(center);
        }

        eventmanager.subscribe('new.frame', function () {
            update();
        });
        eventmanager.subscribe('game.init', function () {
            init();
        });
    });
