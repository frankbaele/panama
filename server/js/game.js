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
  var tokens = ['height', 'width', 'port'];

  rlp(tokens).end(function(results){
    world = new World(results.height, results.width);
    connection = new SocketConnection(results.port, world);
  });

};

init();