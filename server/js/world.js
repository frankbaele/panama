/**
 * @namespace
 * This code is an implementation of the ROT.js cellular map generation by Ondřej Žára, https://github.com/ondras/rot.js
 * Alea is licensed according to the http://en.wikipedia.org/wiki/MIT_License.
 */
var World = function () {
  'use strict';
  var
    $ = require('jquery'),
    RNG = require('RNG').RNG,
    height = 20,
    width = 30,
    tileHeight = 35,
    tileWidth = 35,
    mapData = [];

  function init() {
    generateWorld();
  }
  function generateWorld() {

  }
  /**
   * @class Cellular automaton map generator
   * @augments ROT.Map
   * @param {int} [width=ROT.DEFAULT_WIDTH]
   * @param {int} [height=ROT.DEFAULT_HEIGHT]
   * @param {object} [options] Options
   * @param {int[]} [options.born] List of neighbor counts for a new cell to be born in empty space
   * @param {int[]} [options.survive] List of neighbor counts for an existing  cell to survive
   * @param {int} [options.topology] Topology 4 or 6 or 8
   */
  function Cellular(width, height, options) {
    this._options = {
      born: [5, 6, 7, 8],
      survive: [4, 5, 6, 7, 8],
      topology: 8
    };
    for (var p in options) { this._options[p] = options[p]; }

    this._dirs = ROT.DIRS[this._options.topology];
    mapData = this._fillMap(0);
  }

  /**
   * Fill the map with random values
   * @param {float} probability Probability for a cell to become alive; 0 = all empty, 1 = all full
   */
  function randomize(probability) {
    for (var i=0;i<this.width;i++) {
      for (var j=0;j<this.height;j++) {
        mapData[i][j] = (getUniform() < probability ? 1 : 0);
      }
    }
    return this;
  }

  function set(x, y, value) {
    mapData[x][y] = value;
  }

  function create(callback) {
    var newMap = this._fillMap(0);
    var born = this._options.born;
    var survive = this._options.survive;


    for (var j=0;j<this._height;j++) {
      var widthStep = 1;
      var widthStart = 0;
      if (this._options.topology === 6) {
        widthStep = 2;
        widthStart = j%2;
      }

      for (var i=widthStart; i<this._width; i+=widthStep) {

        var cur = mapData[i][j];
        var ncount = this._getNeighbors(i, j);

        if (cur && survive.indexOf(ncount) != -1) { /* survive */
          newMap[i][j] = 1;
        } else if (!cur && born.indexOf(ncount) != -1) { /* born */
          newMap[i][j] = 1;
        }

        if (callback) { callback(i, j, newMap[i][j]); }
      }
    }

    mapData = newMap;
  }

  /**
   * Get neighbor count at [i,j] in mapData
   */
  function _getNeighbors(cx, cy) {
    var result = 0;
    for (var i=0;i<this._dirs.length;i++) {
      var dir = this._dirs[i];
      var x = cx + dir[0];
      var y = cy + dir[1];

      if (x < 0 || x >= this._width || x < 0 || y >= this._width) { continue; }
      result += (mapData[x][y] == 1 ? 1 : 0);
    }

    return result;
  }

  init();

  return {

  };
};

exports.World = World;



