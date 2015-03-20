define([
        'eventmanager',
        'standardlib',
        'actorList',
        'center',
        'assetLoader'],
    function (eventmanager, standardlib, actorList, center, assetLoader) {
        var healthbarHeight = 7.5;

        function update() {
            _.each(actorList.getCleanUpList(), function (actor) {
                $('canvas.' + actor.uuid).remove();
            });

            actorList.clearCleanUpList();

            _.each(actorList.getActorList(), function (actor) {
                // Check if the actor is inbound, so we can clean up or create the canvas for the actor
                if (actorInbound(actor.variables.coordinates)) {
                    if (!actor.variables.rendered) {
                        $('.ActorsWrapper').append('<canvas id="' + actor.variables.uuid + '"></canvas>');
                        actor.variables.canvas = document.getElementById(actor.variables.uuid);
                        actor.variables.canvas.context = actor.variables.canvas.getContext("2d");
                        actor.variables.canvas.addEventListener("click", function () {
                                eventmanager.publish('actor.selected', actor.variables.uuid)
                            }
                        );
                        actor.variables.rendered = true;

                        updateActor(actor);
                    } else {
                        updateActor(actor);
                    }
                } else {
                    if (actor.variables.rendered) {
                        $('canvas#' + actor.variables.uuid).remove();
                        actor.variables.rendered = false;
                        actor.variables.canvas = '';
                    }
                }
            });

        }

        function updateActor(actor) {
            updateActorPosition(actor);
            updateActorSprite(actor);
        }

        function updateActorPosition(actor) {
            var width = window.innerWidth / (app.config.actor.tile.width);
            var height = window.innerHeight / (app.config.actor.tile.height);
            var coordinates = standardlib.twoDToIso(actor.variables.coordinates.x, actor.variables.coordinates.y);
            var isoCenter = center;
            var y = (coordinates.y - isoCenter.y);
            var bottom = ((height / 2 - y - 1) * (app.config.actor.tile.height)) + 20;
            $(actor.variables.canvas).css('z-index', actor.variables.coordinates.y).css('bottom', bottom);

            var x = coordinates.x - (isoCenter.x - width / 2);
            var left = (x * (app.config.actor.tile.width) - actor.variables.sprite.center.x);
            $(actor.variables.canvas).css('left', left);
        }

        function updateActorSprite(actor) {
            actor.variables.canvas.context.clearRect(0, 0, actor.variables.canvas.width, actor.variables.canvas.height);

            if (typeof actor.variables.sprite[actor.variables.state][actor.variables.direction][actor.variables.spriteIndex] === 'undefined') {
                actor.variables.spriteIndex = 0;
            }

            drawActor({
                sprite: actor.variables.sprite[actor.variables.state][actor.variables.direction][actor.variables.spriteIndex],
                canvas: actor.variables.canvas
            });

            if(actor.variables.selected){
                drawHealthBar({
                    canvas: actor.variables.canvas,
                    health: actor.variables.health,
                    hp: actor.variables.hp
                })
            }

            actor.variables.spriteIndex++;
        }

        function actorInbound(config) {
            var coordinates = standardlib.twoDToIso(config.x, config.y);
            var isoCenter = center;
            var width = Math.ceil(window.innerWidth / (app.config.actor.tile.width));
            var height = Math.ceil(window.innerHeight / (app.config.actor.tile.height));
            if ((coordinates.x >= (isoCenter.x - width / 2)) && coordinates.x <= (isoCenter.x + width / 2)) {
                if ((coordinates.y >= (isoCenter.y - height / 2)) && coordinates.y <= (isoCenter.y + height / 2)) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }

        function drawActor(config) {
            // For lop trough all the atlasses with find, because we want to exit this loop when the atlas is found.
            var spt,
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
            config.canvas.width = spt.w;
            config.canvas.height = spt.h + healthbarHeight;
            config.canvas.context.drawImage(
                img,
                spt.x, spt.y,
                spt.w, spt.h,
                0,
                healthbarHeight,
                spt.w,
                spt.h);
        }

        function drawHealthBar (config){
            config.canvas.context.fillStyle = 'red';
            config.canvas.context.fillRect((config.canvas.width - 40)/2,0,38, healthbarHeight-2);
            config.canvas.context.fillStyle = 'green';
            var health = config.health/config.hp;
            config.canvas.context.fillRect((config.canvas.width - 40)/2,0,(38) * health, healthbarHeight-2);
        }

        function applySelection (selection){
            // Remove all previous selections.
            var xCorrection = window.innerWidth / 2;
            var yCorrection = window.innerHeight / 2;
            var coordinatesWindow = {};
            coordinatesWindow.x = -((center.x) * app.config.actor.tile.width + ((world.width*app.config.actor.tile.width) / 2) - xCorrection);
            coordinatesWindow.y = -(((center.y) * app.config.actor.tile.height)) + yCorrection;
            var left = -coordinatesWindow.x  + selection.left;
            var top = -coordinatesWindow.y + selection.top;
            var topLeft = standardlib.worldPosToGridPos(left, top);
            topLeft = standardlib.twoDToIso(topLeft.x, topLeft.y);
            var bottomRight = standardlib.worldPosToGridPos(left + selection.width, top + selection.height);
            bottomRight = standardlib.twoDToIso(bottomRight.x, bottomRight.y)
            _.each(actorList.getActorList(), function (actor) {
                var coordinates = standardlib.twoDToIso(actor.variables.coordinates.x, actor.variables.coordinates.y);
                if ((coordinates.x >= topLeft.x) && coordinates.x <= bottomRight.x) {
                    if ((coordinates.y >= topLeft.y) && coordinates.y <= bottomRight.y) {

                        actor.variables.selected = true;
                    }
                    else {
                        actor.variables.selected = false;
                    }
                }
                else {
                    actor.variables.selected = false;
                }
            });
        }

        eventmanager.subscribe('new.frame', function () {
            update();
        });
        eventmanager.subscribe('center.update.start', function () {
            $('.ActorsWrapper').removeClass('no-panning');
        })
        eventmanager.subscribe('center.update.stop', function () {
            $('.ActorsWrapper').addClass('no-panning');
        })
        eventmanager.subscribe('map.selection', function(selection){
            applySelection(selection);
        })
    });
