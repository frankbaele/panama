define([
        'eventmanager',
        'standardlib',
        'world',
        'actorList',
        'assets',
        'jQuery',
        'underscore'],
    function (eventmanager, standardlib, world, actorList, assets) {

        function update() {
            _.each(actorList.getCleanUpList(), function (actor) {
                $('canvas.' + actor.uuid).remove();
            });

            actorList.clearCleanUpList();

            _.each(actorList.getActorList(), function (actor) {
                // Check if the actor is inbound, so we can clean up or create the canvas for the actor
                if (actorInbound(actor.coordinates)) {
                    if (!actor.rendered) {
                        $('.ActorsWrapper').append('<canvas id="' + actor.uuid + '"></canvas>');
                        actor.canvas = document.getElementById(actor.uuid);
                        actor.canvas.width = actor.width;
                        actor.canvas.height = actor.height;
                        actor.rendered = true;
                        updateActor(actor);
                    } else{
                        updateActor(actor);
                    }
                } else {
                    if (actor.rendered) {
                        $('canvas#' + actor.uuid).remove();
                        actor.rendered = false;
                        actor.canvas = '';
                    }
                }
            });

        }
        function updateActor(actor){
            updateActorPosition(actor);
            updateActorSprite(actor);


        }

        function updateActorPosition(actor){
            var width = Math.ceil(window.innerWidth / (world.tileWidth/2));
            var height = Math.ceil(window.innerHeight / (world.tileHeight/2));
            var coordinates = standardlib.twoDToIso(actor.coordinates.x, actor.coordinates.y);
            var isoCenter = standardlib.twoDToIso(world.center.x, world.center.y);


            var y = coordinates.y - (isoCenter.y - height / 2);
            var top = y * (world.tileHeight/2);
            $(actor.canvas).css('top', top);

            var x = coordinates.x - (isoCenter.x - width / 2);
            console.log(width);
            console.log(x);
            var left = x * (world.tileWidth/2);
            $(actor.canvas).css('left', left);
        }

        function updateActorSprite(actor){

        }

        function actorInbound(config) {
            var coordinates = standardlib.twoDToIso(config.x, config.y);
            var isoCenter = standardlib.twoDToIso(world.center.x, world.center.y);
            var width = Math.ceil(window.innerWidth / (world.tileWidth/2));
            var height = Math.ceil(window.innerHeight / (world.tileHeight/2));
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

        }

        eventmanager.subscribe('new.frame', function () {
            update();
        });
    });
