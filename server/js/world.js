/**
 * @namespace
 * This code is an implementation of the ROT.js cellular map generation by Ondřej Žára, https://github.com/ondras/rot.js
 * Alea is licensed according to the http://en.wikipedia.org/wiki/MIT_License.
 */
var World = function () {
  'use strict';
  var
    $ = require('jquery'),
    RNG = require('./RNG').RNG,
    height = 25,
    width = 25,
    options,
    tileWidth = 10,
    tileHeight = 10,
    mapData = [],
    born = [ 5, 6, 7, 8],
    survive = [ 4, 5, 6, 7, 8],
    topology = 8,
    genRNG = new RNG(),
    dirs = [
      [ 0, -1],
      [ 1, -1],
      [ 1, 0],
      [ 1, 1],
      [ 0, 1],
      [-1, 1],
      [-1, 0],
      [-1, -1]
    ];


  function init() {
    mapData = fillMap();
    mapData = randomize(0.47, mapData);
    createMap();
    mapData = superSizeMap(mapData, 4);
  }

  /**
   * Fill the map with random values
   * @param {float} probability Probability for a cell to become alive; 0 = all empty, 1 = all full
   */
  function randomize(probability, data) {
    var
      y,
      x;
    for (y = 0; y < height; y++) {
      for (x = 0; x < width; x++) {
        data[y][x] = (genRNG.getUniform() < probability ? 1 : 0);
      }
    }
    return data;
  }

  function fillMap() {
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

  function getNeighbors(cx, cy) {
    var result = 0;
    for (var i = 0; i < dirs.length; i++) {
      var dir = dirs[i];
      var x = cx + dir[0];
      var y = cy + dir[1];

      if (x < 0 || x >= width || x < 0 || y >= width) {
        continue;
      }
      result += (mapData[x][y] === 1 ? 1 : 0);
    }

    return result;
  }

  function createMap(callback) {
    var count = 0;
    for (var r = 0; r < 3; r++) {
      var newMap = fillMap();
      for (var j = 0; j < height; j++) {
        var widthStep = 1;
        var widthStart = 0;
        if (topology === 6) {
          widthStep = 2;
          widthStart = j % 2;
        }

        for (var i = widthStart; i < width; i += widthStep) {
          count++;
          var cur = mapData[i][j];
          var ncount = getNeighbors(i, j);

          if (cur && survive.indexOf(ncount) !== -1) { /* survive */
            newMap[i][j] = 1;
          } else if (!cur && born.indexOf(ncount) !== -1) { /* born */
            newMap[i][j] = 1;
          }

          if (callback) {
            callback(i, j, newMap[i][j]);
          }
        }
      }

      mapData = newMap;
    }

  }

  function set(x, y, value) {
    mapData[x][y] = value;
  }

  function superSizeMap(map, amount) {
    var newMap = [];
    for (var y = 0; y < height; y++) {
      for (var yAmount = 0; yAmount < amount; yAmount++) {
        var newY = (y * amount) + yAmount;
        newMap[newY] = [];
        for (var x = 0; x < width; x++) {
          for (var xAmount = 0; xAmount < amount; xAmount++) {
            var newX = (x * amount) + xAmount;
            newMap[newY][newX] = map[y][x];
          }
        }
      }
    }

   width = width * amount;
   height = height * amount;
    return newMap;
  }

  init();

  return {
    tileWidth: tileWidth,
    tileHeight: tileHeight,
    height: height,
    width: width,
    mapData: mapData
  };
};

exports.World = World;



