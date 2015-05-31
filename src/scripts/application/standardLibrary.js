define(['eventmanager'], function (eventmanager) {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    function guid() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function isoToTwoD(config) {
        var x = (config.x + config.y) / 2;
        var y = (config.y - config.x) / 2;
        return ({x:x,y:y});
    }
    function twoDToIso(config) {
        var newCoordinates = {};
        newCoordinates.x = (config.x - config.y)/2;
        newCoordinates.y = (config.x + config.y)/2;
        return newCoordinates;
    }

    function worldPosToGridPos(config) {
        config = _.cloneDeep(config);
        // Add correction for the centering of the map
        coords = {};
        config.x = config.x - (app.config.actor.grid.width/2 * app.config.actor.tile.width);
        coords.x = (config.x/ (app.config.actor.tile.width / 2) + config.y / (app.config.actor.tile.height / 2)) / 2;
        coords.y = (config.y/ (app.config.actor.tile.height / 2) - (config.x / (app.config.actor.tile.width / 2))) / 2;
        coords.x = Math.floor(coords.x);
        coords.y = Math.floor(coords.y);
        return (coords);
    }

    function worldPosToIsoPos(config){
        var gridCoordinates = worldPosToGridPos(config);
        return twoDToIso({x: gridCoordinates.x, y:gridCoordinates.y});
    }

    function isoWorldPosToCarWorldPos(config){
        config = _.cloneDeep(config);
        config.x = config.x - (app.config.actor.grid.width/2 * app.config.actor.tile.width);
        var coords = {};
        // Add correction for the centering of the map
        coords.x = (config.x + config.y) / 2;
        coords.y = (config.y - config.x) / 2;
        return coords;
    }

    function carWorldPosToIsoWorldPos(config){
        config = _.cloneDeep(config);
        config = {
            x: config.x / app.config.actor.car.width,
            y: config.y / app.config.actor.car.height
        };
        // Add correction for the centering of the map
        var x = (config.x - config.y) /2;
        var y = (config.x + config.y) /2;
        x = x* app.config.actor.tile.width;
        y = y * app.config.actor.tile.height;
        x = x + (app.config.actor.grid.width/2 * app.config.actor.tile.width);
        return ({x:x,y:y});
    }

    function gridPosToWorldPos(config){
        var iso = twoDToIso({x: config.x, y:config.y});
        var y = iso.y * app.config.actor.tile.height;
        var x = iso.x * app.config.actor.tile.width + (app.config.actor.grid.width/2 * app.config.actor.tile.width);
        return{
            x:x,
            y:y
        }
    }

    function terrainGridPosToWorldPos(config){
        var iso = twoDToIso({x: config.x, y:config.y});
        var y = iso.y * app.config.terrain.tile.height;
        var x = iso.x * app.config.terrain.tile.width + (app.config.terrain.grid.width/2 * app.config.terrain.tile.width);
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
    }


    return {
        guid: guid,
        isoToTwoD: isoToTwoD,
        twoDToIso: twoDToIso,
        worldPosToGridPos: worldPosToGridPos,
        worldPosToIsoPos: worldPosToIsoPos,
        gridPosToWorldPos: gridPosToWorldPos,
        terrainGridPosToWorldPos: terrainGridPosToWorldPos,
        isoWorldPosToCarWorldPos: isoWorldPosToCarWorldPos,
        carWorldPosToIsoWorldPos: carWorldPosToIsoWorldPos,
        checkWait: checkWait
    };
});
