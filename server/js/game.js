var
  // Node js requierements
  _ = require('underscore'),
  rlp = require('readline-prompter'),
  // File variable includes
  World = require("./world").World,
  SocketConnection = require("./socketConnection").Connection,
  //Local variables
  world,
  connection;


function init() {
  'use strict';
  world = new World(100, 100);
  connection = new SocketConnection('8000', world);
}

init();