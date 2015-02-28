define([
        'eventmanager',
        'standardlib',
        'world',
        'actorList',
        'assets',
        'jQuery',
        'underscore'],
    function (eventmanager, standardlib, world, actorList, assets) {
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
            var width = window.innerWidth / (world.tileWidth);
            var height = window.innerHeight / (world.tileHeight);
            var coordinates = standardlib.twoDToIso(actor.variables.coordinates.x, actor.variables.coordinates.y);
            var isoCenter = world.center;
            var y = (coordinates.y - isoCenter.y);
            var bottom = ((height / 2 - y - 1) * (world.tileHeight)) + 20;
            $(actor.variables.canvas).css('z-index', actor.variables.coordinates.y).css('bottom', bottom);

            var x = coordinates.x - (isoCenter.x - width / 2);
            var left = (x * (world.tileWidth) - actor.variables.sprite.center.x);
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
            var isoCenter = world.center;
            var width = Math.ceil(window.innerWidth / (world.tileWidth));
            var height = Math.ceil(window.innerHeight / (world.tileHeight));
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
            _.each(actorList.getActorList(), function (actor) {
                actor.variables.selected = false;
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
