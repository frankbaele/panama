define([, 'eventmanager'], function (eventmanager) {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };

    function guid() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function isoToTwoD(posX, posY) {
        var newCoordinates = {};
        newCoordinates.x = (posY + posX);
        newCoordinates.y = (posY - posX);
        return newCoordinates;
    };

    function twoDToIso(posX, posY) {
        var newCoordinates = {};
        newCoordinates.x = (posX - posY) / 2;
        newCoordinates.y = (posX + posY) / 2;
        return newCoordinates;
    }

    function worldPosToGridPos(config) {
        config = _.cloneDeep(config);
        config.x = config.x - (app.config.actor.grid.width/2 * app.config.actor.tile.width);
        // Add correction for the centering of the map
        var x = (config.x/ (app.config.actor.tile.width / 2) + config.y / (app.config.actor.tile.height / 2)) / 2;
        var y = (config.y/ (app.config.actor.tile.height / 2) - (config.x / (app.config.actor.tile.width / 2))) / 2;
        x = Math.floor(x);
        y = Math.floor(y);
        return ({x:x,y:y});
    }

    function worldPosToIsoPos(config){
        var gridCoordinates = worldPosToGridPos(config);
        return twoDToIso(gridCoordinates.x, gridCoordinates.y);
    }
    function gridPosToWorldPos(config){
        var iso = twoDToIso(config.x, config.y);
        var y = iso.y * app.config.actor.tile.height;
        var x = iso.x * app.config.actor.tile.width + (app.config.actor.grid.width/2 * app.config.actor.tile.width);

        return{
            x:x,
            y:y
        }
    }
    function checkWait(conditionFunction, resultFunction) {
        var tev = setInterval(function () {
            if (conditionFunction()) {
                resultFunction
                clearInterval(tev);
            }
        }, 1000);
    };
    function roundHalf(num) {
        num = Math.round(num * 2) / 2;
        return num;
    }

    return {
        guid: guid,
        isoToTwoD: isoToTwoD,
        twoDToIso: twoDToIso,
        worldPosToGridPos: worldPosToGridPos,
        worldPosToIsoPos: worldPosToIsoPos,
        gridPosToWorldPos: gridPosToWorldPos,
        checkWait: checkWait
    };
})
