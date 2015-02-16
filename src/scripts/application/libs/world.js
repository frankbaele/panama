define([
    'RNG',
    'underscore',
    'graph',
    'eventmanager'], function (RNG, _, graph, eventmanager) {

    /**
     * @namespace
     * This code is an implementation of the ROT.js cellular map generation by Ondřej Žára, https://github.com/ondras/rot.js
     * Alea is licensed according to the http://en.wikipedia.org/wiki/MIT_License.
     */
    var
        height = 30,
        width = 30,
        tileWidth = 132,
        tileHeight = 66,
        mapData = [],
        mapGraph,
        born = [5, 6, 7, 8],
        survive = [4, 5, 6, 7, 8],
        topology = 8,
        center = twoDToIso(width, height),
        probability = 0.47,
        padding ={
            x: 50,
            y: 50
        },
        dirs = [
            [0, -1],
            [1, -1],
            [1, 0],
            [1, 1],
            [0, 1],
            [-1, 1],
            [-1, 0],
            [-1, -1]
        ];

    var pressedkeys = {
        up: 0,
        down: 0,
        left: 0,
        right: 0
    };

    function init() {
        mapData = (_.compose(runAutomatonCycle, superSizemap, runAutomatonCycle, runAutomatonCycle, randomize, fillmap))();
        mapGraph = new graph(mapData);
    }

    /**
     * Fill the map with random values
     * @param {float} probability Probability for a cell to become alive; 0 = all empty, 1 = all full
     */
    function randomize(data) {
        var
            y,
            x;
        for (y = 0; y < height; y++) {
            for (x = 0; x < width; x++) {
                data[y][x] = (RNG.getUniform() < probability ? 1 : 0);
            }
        }
        return data;
    }

    function fillmap() {
        var
            data = [],
            y,
            x;

        for (y = 0; y < height; y++) {
            data[y] = [];
            for (x = 0; x < width; x++) {
                data[y][x] = 0;
            }
        }
        return data;
    }

    function getNeighbors(data, cx, cy) {
        var result = 0;
        for (var i = 0; i < dirs.length; i++) {
            var dir = dirs[i];
            var x = cx + dir[0];
            var y = cy + dir[1];

            if (x < 0 || x >= width || x < 0 || y >= width) {
                continue;
            }
            result += (data[x][y] === 1 ? 1 : 0);
        }

        return result;
    }
    function twoDToIso(posX, posY) {
        var newCoordinates = {};
        newCoordinates.x = ((posX - posY) / 2);
        newCoordinates.y = ((posX + posY) / 2);
        return newCoordinates;
    };
    function runAutomatonCycle(data) {
        var count = 0;
        var newmap = fillmap();
        for (var j = 0; j < height; j++) {
            var widthStep = 1;
            var widthStart = 0;
            if (topology === 6) {
                widthStep = 2;
                widthStart = j % 2;
            }

            for (var i = widthStart; i < width; i += widthStep) {
                count++;
                var cur = data[i][j];
                var ncount = getNeighbors(data, i, j);

                if (cur && survive.indexOf(ncount) !== -1) { /* survive */
                    newmap[i][j] = 1;
                } else if (!cur && born.indexOf(ncount) !== -1) { /* born */
                    newmap[i][j] = 1;
                }
            }
        }
        return newmap;

    }

    function set(x, y, value) {
        mapData[x][y] = value;
    }

    function superSizemap(map) {
        var newmap = [];
        var amount = 2;
        for (var y = 0; y < height; y++) {
            for (var yAmount = 0; yAmount < amount; yAmount++) {
                var newY = (y * amount) + yAmount;
                newmap[newY] = [];
                for (var x = 0; x < width; x++) {
                    for (var xAmount = 0; xAmount < amount; xAmount++) {
                        var newX = (x * amount) + xAmount;
                        newmap[newY][newX] = map[y][x];
                    }
                }
            }
        }

        width = width * amount;
        height = height * amount;
        return newmap;
    }

    function outOfBound(posX, posY) {
        if (posX >= 0 && posY >= 0) {
            if (posX < width) {
                if (posY < height) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    function inBoundTile(posX, posY) {
        /*
        if (outOfBound(posX, posY)) {
            if (posX <= 0) {
                posX = 0;
            } else if (posX >= width) {
                posX = width - 1;
            }

            if (posY <= 0) {
                posY = 0;
            } else if (posY >= height) {
                posY = height - 1;
            }
        }
        */
        return {x: posX, y: posY};
    }

    function tileIsOpen(tileIndex) {
        if (mapData[tileIndex.y][tileIndex.x] === 0) {
            return true;
        } else {
            return false;
        }
    }

    function update() {
        var inbound = {x: 0, y: 0};
        if (pressedkeys.up === 1) {
            inbound.y = inbound.y - 1;
        }
        if (pressedkeys.down === 1) {
            inbound.y = inbound.y + 1;
        }
        if (pressedkeys.left === 1) {
            inbound.x = inbound.x - 1;
        }
        if (pressedkeys.right === 1) {
            inbound.x = inbound.x + 1;
        }
        // Only update the map position if there is a change.
        if (inbound.x !== 0 || inbound.y !== 0) {
            inbound = inBoundTile(center.x + inbound.x, center.y + inbound.y);
            center.x = inbound.x;
            center.y = inbound.y;
            eventmanager.publish('center.update.start');
        } else {
            eventmanager.publish('center.update.stop');
        }
    }

    eventmanager.subscribe('new.frame', function () {
        update();
    });
    eventmanager.subscribe('pan.up', function (e) {
        pressedkeys.up = e;
    });
    eventmanager.subscribe('pan.down', function (e) {
        pressedkeys.down = e;
    });
    eventmanager.subscribe('pan.left', function (e) {
        pressedkeys.left = e;
    });
    eventmanager.subscribe('pan.right', function (e) {
        pressedkeys.right = e;
    });

    init();
    return {
        tileWidth: tileWidth,
        tileHeight: tileHeight,
        inBoundTile: inBoundTile,
        outOfBound: outOfBound,
        tileIsOpen: tileIsOpen,
        height: height,
        width: width,
        mapData: mapData,
        center: center,
        padding: padding,
        graph: mapGraph
    };
});


