var World = function () {
  'use strict';
  var
    $ = require('jquery'),
    matrix = new Object(),
    json = require('../JSON/testmap.json');

  function init() {
    generateWorld();
  }
  function generateWorld() {
    // For now we parse a preconstructed world map from tiled,
    // server should be able to choose between custom map or random map.
    matrix.height = 20;
    matrix.width = 30;
    matrix.tileheight = 35;
    matrix.tilewidth = 35;
    matrix.data = [matrix.height];
    for (var i = 0; matrix.height > i; i++) {
      matrix.data[i] = [matrix.width];
      for (var j = 0; matrix.width > j; j++){
        matrix.data[i][j] = 0;
      }
    }
  }
  init();

  return {
    matrix: matrix
  };
};

exports.World = World;



