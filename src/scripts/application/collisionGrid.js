define(['eventmanager', 'world', 'pathfinding'], function (eventmanager, world, PF) {
        var that = {};
        that.init = function () {
            // add the world grid and double it.
            that.grid = {};
            that.grid.dynamic = superSizemap(_.cloneDeep(world.grid));
            that.grid.static = _.cloneDeep(that.grid.dynamic);
            //Force empty update so the graph gets generated.
            that.updateStatic({
                tooArray: [],
                fromArray: []
            });
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
            if(!_.isEqual(fromArray, tooArray)){
                tooArray = that.intersect(tooArray, fromArray);
                fromArray = that.intersect(fromArray, tooArray);
                var open = true;
                // check if the new coordinates are open.
                _.each(tooArray, function (coordinate) {
                    if (that.grid.dynamic[coordinate.x][coordinate.y] !== 0) {
                        open = false;
                    }
                });

                if (open) {
                    // close the new too coordinates
                    _.each(tooArray, function (coordinate) {
                        that.grid.dynamic[coordinate.x][coordinate.y] = 1;
                    });
                    // open up the unpopulated from coordinates
                    _.each(fromArray, function (coordinate) {
                        that.grid.dynamic[coordinate.x][coordinate.y] = 0;
                    });

                    // Execute the success callback if it exists
                    if (typeof config.success !== 'undefined') {
                        config.success();
                    }
                    // update the static grid also(e.g. building)
                    if (config.static) {
                        that.updateStatic({
                            tooArray: tooArray,
                            fromArray: fromArray
                        });
                    }
                } else {
                    // execute the failure callback.
                    if (typeof config.failure !== 'undefined') {
                        config.failure(tooArray);
                    }
                }
            } else {
                if (typeof config.success !== 'undefined') {
                    config.success();
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
        /**
         * Checks if the given tile is open or not
         * @param config
         * @returns {boolean}
         */
        that.isOpen = function (config) {
            return that.grid.dynamic[config.new.y][config.new.x] === 0;
        };
        /**
         *
         * @param config
         */
        that.getSubGrid = function (config) {
            var array = [];
            for (var i = 0; i < config.height; i++) {
                array[config.x + i] = [];
                for (var j = 0; j < config.width; j++) {
                    array[config.x + i][config.y + j] = that.grid.dynamic[config.x + i][config.y +j];
                }
            }
            return new PF.Grid(array.length, array.length, array);
        };
        /**
         * Update the static collision map and regenerates the graph for it.
         * @param config
         */
        that.updateStatic = function (config) {
            // close the new too coordinates
            _.each(config.tooArray, function (coordinate) {
                that.grid.static[coordinate.x][coordinate.y] = 1;
            });
            // open up the unpopulated from coordinates
            _.each(config.fromArray, function (coordinate) {
                that.grid.static[coordinate.x][coordinate.y] = 0;
            });
            that.grid.graph = new PF.Grid(that.grid.static.length, that.grid.static[0].length, that.grid.static);
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
)
;
