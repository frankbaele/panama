var World = function () {
  'use strict';
  var
  $ = require('jquery'),
  matrix = require('../JSON/testmap.json');

  function init() {
    generateWorld();
  }
  function generateWorld() {
    // For now we parse a preconstructed world map from tiled,
    // server should be able to choose between custom map or random map.

  }
  init();

  return {
    matrix: matrix
  };
};

exports.World = World;



