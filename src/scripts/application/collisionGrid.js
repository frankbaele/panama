define(['eventmanager', 'PF', 'RVO', 'standardlib', 'world'], function (eventmanager, PF, RVO, stl, world) {
        var that = {};
        that.updateQueue = [];
        that.debugGrid = {};

        that.init = function () {
            // add the world grid and double it.
            that.grid = that.fillmap(app.config.terrain.grid.height, app.config.terrain.grid.width);
            that.simulator = new RVO.Simulator(4, 40, 10, 5, 5, 20, 1, [0, 0]);
            // check for each grid coordinate if the corresponding tile is walkable
            for (var i = 0; i < world.grid.length; i++) {
                for (var j = 0; j < world.grid[0].length; j++) {
                    var tile = world.grid[i][j] - 1;
                    // if the tile is not walkable close the grid coordinate
                   if (app.config.terrain.tileSet.tileproperties[tile].walkable === 'false') {
                       that.grid[j][i] = 1;
                       var coords = stl.gridPosToWorldPos({
                           x: j,
                           y: i
                       });
                        /*
                       that.simulator.addObstacle([
                           [coords.x, coords.y],
                           [coords.x - app.config.terrain.tile.width / 2, coords.y + app.config.terrain.tile.height / 2],
                           [coords.x, coords.y + app.config.terrain.tile.height ],
                           [coords.x + app.config.terrain.tile.width / 2, coords.y + app.config.terrain.tile.height / 2]
                       ]);
                       */

                    }
                }
            }

            // The orignal map has been filled up now double it in size to have more precise grid, indepent from the terrain.
            that.grid = superSizemap(that.grid);
            // Generate the node tree for the pathfinding
            that.graph = new PF.Grid(that.grid.length, that.grid[0].length, that.grid);
            that.simulator.processObstacles();
        };

        /**
         * update the collisionGrid
         * @param from
         * @param too
         * @param height
         * @param static:boolean
         */
        that.update = function (config) {
            // Correct the unset and set array where there is overlap between from and too
            var tooArray = that.generateUpdateArray({
                grid: config.too,
                height: config.height,
                width: config.width
            });

            var fromArray = that.generateUpdateArray({
                grid: config.from,
                height: config.height,
                width: config.width
            });

            var temp = that.intersect(tooArray, fromArray);
            var open = true;
            // check if the new coordinates are open.
            _.each(temp, function (coordinate) {
                if (that.grid[coordinate.x][coordinate.y] !== 0) {
                    open = false;
                }
            });
            if (open) {
                // open up the unpopulated from coordinates
                _.each(fromArray, function (coordinate) {
                    that.grid[coordinate.x][coordinate.y] = 0;
                });

                // close the new too coordinates
                _.each(tooArray, function (coordinate) {
                    that.grid[coordinate.x][coordinate.y] = 1;
                });
                that.graph = new PF.Grid(that.grid.length, that.grid[0].length, that.grid);
                // Execute the success callback if it exists
                if (typeof config.success !== 'undefined') {
                    config.success();
                }
            } else {

                // execute the failure callback.
                if (typeof config.failure !== 'undefined') {
                    config.failure(tooArray);
                }
            }

        };
        /**
         * Generates an collision array based on the coordinate and dimensions
         * @param config
         * @returns {Array}
         */
        that.generateUpdateArray = function (config) {
            var array = [];
            if (typeof config.grid !== 'undefined') {
                for (var i = 0; i < config.height; i++) {
                    for (var j = 0; j < config.width; j++) {
                        array.push({
                            x: config.grid.x + j,
                            y: config.grid.y + i
                        })
                    }
                }
            }
            return array;
        };
        /**
         * Returns an array with the unique left array values
         * @param array1
         * @param array2
         * @returns {Array}
         */
        that.intersect = function (array1, array2) {
            var array = [];
            // Iterate over the first array and compare each value to the second array.
            _.each(array1, function (item) {
                // if findwhere returns undefined we can add the element as it is unique.
                if (!_.findWhere(array2, item)) {
                    array.push(item);
                }
            });
            return array;
        };
        that.PolygonToGridCoordinates = function (object) {
            var gridCoordinates = [];
            _.each(object.polygon, function (coordinate) {
                var isoCoordinates = {
                    x: (coordinate.x + object.x) / app.config.terrain.tile.height,
                    y: (coordinate.y + object.y) / app.config.terrain.tile.height
                };
                gridCoordinates.push(isoCoordinates);
            });
            return gridCoordinates;
        };
        that.PolygonToIsoWorldCoordinates = function (object) {
            var isoCoordinates = [];
            _.each(object.polygon, function (coordinate) {
                var isoCoordinate = stl.carWorldPosToIsoWorldPos({
                    x: coordinate.x + object.x,
                    y: coordinate.y + object.y
                });
                isoCoordinates.push(isoCoordinate);
            });
            return isoCoordinates;
        };
        that.fillmap = function (height, width) {
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
        };

        /**
         * Checks if the given tile is open or not
         * @param config
         * @returns {boolean}
         */
        that.isOpen = function (config) {
            return that.grid[config.new.y][config.new.x] === 0;
        };
        /**
         *
         * @param config
         */
        that.setSubGrid = function (config) {
            var array = [];
            for (var i = 0; i < config.size.y; i++) {
                array[i] = [];
                for (var j = 0; j < config.size.x; j++) {
                    that.grid[config.start.x + j][config.start.y + i] = 1;
                }
            }
        };
        /**
         * Doubles a given array and returns it
         * @param map
         * @returns {Array}
         */

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

        that.init();
        return that;
    }
);
