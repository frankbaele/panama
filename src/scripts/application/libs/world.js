define(['RNG'], function (RNG) {

    var
        width = app.config.terrain.grid.width,
        height = app.config.terrain.grid.height,
        grid = [],
        born = [5, 6, 7, 8],
        survive = [4, 5, 6, 7, 8],
        topology = 8,
        probability = 0.47,
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

    function init() {
        grid = (_.compose(runAutomatonCycle, superSizemap, runAutomatonCycle, runAutomatonCycle, randomize, fillmap))();
    }

    /**
     * Fill the map with random values
     * @param {float} probability Probability for a cell to become alive; 0 = all empty, 1 = all full
     */
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

    function randomize(data) {
        var
            y,
            x;
        for (y = 0; y < data.length; y++) {
            for (x = 0; x < data[0].length; x++) {
                data[y][x] = (RNG.getUniform() < probability ? 1 : 0);
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

    function runAutomatonCycle(data) {
        var count = 0;
        var newmap = fillmap();
        for (var j = 0; j < data.length; j++) {
            var widthStep = 1;
            var widthStart = 0;
            if (topology === 6) {
                widthStep = 2;
                widthStart = j % 2;
            }

            for (var i = widthStart; i < data[0].length; i += widthStep) {
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

    function superSizemap(map) {
        var newmap = [];
        var amount = 2;
        for (var y = 0; y < map.length; y++) {
            for (var yAmount = 0; yAmount < amount; yAmount++) {
                var newY = (y * amount) + yAmount;
                newmap[newY] = [];
                for (var x = 0; x < map[0].length; x++) {
                    for (var xAmount = 0; xAmount < amount; xAmount++) {
                        var newX = (x * amount) + xAmount;
                        newmap[newY][newX] = map[y][x];
                    }
                }
            }
        }
        return newmap;
    }

    init();
    return {
        grid: grid
    };
});


