define([
        'eventmanager',
        'standardlib',
        'world',
        'canvas',
        'actorList',
        'underscore'],
    function (eventmanager, standardlib, world, canvas, actorList) {
        function init() {

        }

        function update() {
            _.each(actorList.getCleanUpList(), function (actor) {

            });
            actorList.clearCleanUpList();
            _.each(actorList.getActorList(), function (actor) {

            });
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
            coordinates.x = (coordinates.x * world.tileWidth + ((canvas.actor.canvas.width) / 2)) - ((spt.w - world.tileWidth) / 2) - world.tileWidth / 2;
            coordinates.y = coordinates.y * world.tileHeight + (spt.w / 2 - spt.h);

            canvas.actors.context.drawImage(
                img,
                spt.x, spt.y,
                spt.w, spt.h,
                coordinates.x,
                coordinates.y,
                spt.w,
                spt.h);
        }

        eventmanager.subscribe('game.init', function () {
            init();
        });
    });
