define(['world', 'eventmanager'], function (world, eventmanager) {
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
        newCoordinates.x = (posX - posY);
        newCoordinates.y = (posX + posY);
        return newCoordinates;
    };

    function worldPosToGridPos(PosX, PosY) {
        var x = PosX;
        var y = PosY;
        x = (x / (world.tileWidth / 2) + y / (world.tileHeight / 2)) / 2;
        y = (y / (world.tileHeight / 2) - (x / (world.tileWidth / 2))) / 2;

        x = Math.floor(x);
        y = Math.floor(y);
        x =  x - world.width/2;
        console.log(x, y);
        return ({x:x,y:y});
    };

    function windowPosToGridPos(config) {

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
        windowPosToGridPos: windowPosToGridPos,
        checkWait: checkWait
    };
})
