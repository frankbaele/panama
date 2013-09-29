var
// Node js requierements
  _ = require('underscore'),
  // File variable includes
  World = require("./world").World,
  SocketConnection = require("./socketConnection").Connection,
  //Local variables
  generatedWorld,
  connection;


function init() {
  'use strict';
  generatedWorld = new World();
  connection = new SocketConnection(8000, generatedWorld);
}
init();