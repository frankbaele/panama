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
                        actor.canvas.context = actor.canvas.getContext("2d");
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
            var width = window.innerWidth / (world.tileWidth);
            var height = window.innerHeight / (world.tileHeight);
            var coordinates = standardlib.twoDToIso(actor.coordinates.x, actor.coordinates.y);
            var isoCenter = world.center;
            var y = (coordinates.y - isoCenter.y);
            var bottom = ((height/2 - y) * (world.tileHeight));
            $(actor.canvas).css('bottom', bottom);

            var x = coordinates.x - (isoCenter.x - width / 2);
            var left = (x * (world.tileWidth) - actor.sprite.center.x) ;
            $(actor.canvas).css('left', left);
        }

        function updateActorSprite(actor){
            if(typeof actor.sprite[actor.state][actor.direction][actor.spriteIndex] === 'undefined') {
                actor.spriteIndex = 0;
            }
            drawActor({
                sprite: actor.sprite[actor.state][actor.direction][actor.spriteIndex],
                canvas: actor.canvas
            });
            actor.spriteIndex++;
        }

        function actorInbound(config) {
            var coordinates = standardlib.twoDToIso(config.x, config.y);
            var isoCenter = world.center;
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
            config.canvas.context.clearRect ( 0 , 0 , config.canvas.width, config.canvas.height );
            config.canvas.width =  spt.w;
            config.canvas.height = spt.h;
            config.canvas.context.drawImage(
                img,
                spt.x, spt.y,
                spt.w, spt.h,
                0,
                0,
                spt.w,
                spt.h);
        }
        eventmanager.subscribe('new.frame', function () {
            update();
        });
    });
