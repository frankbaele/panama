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
    height = 30,
    width = 30,
    options,
    tileWidth = 35,
    tileHeight = 35,
    mapData = [],
    genRNG = new RNG();


  function init() {
    randomize(0.6);
  }
  /**
   * Fill the map with random values
   * @param {float} probability Probability for a cell to become alive; 0 = all empty, 1 = all full
   */
  function randomize(probability) {
    for (var i=0;i<height;i++) {
      mapData[i] = [];
      for (var j=0;j<width;j++) {
        mapData[i][j] = (genRNG.getUniform() < probability ? 1 : 0);
      }
    }
  }

  function set(x, y, value) {
    mapData[x][y] = value;
  }
  init();

  return {
    tileWidth : tileWidth,
    tileHeight : tileHeight,
    height: height,
    width: width,
    mapData: mapData
  };
};

exports.World = World;



