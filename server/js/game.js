var
  // Node js requierements
  _ = require('underscore'),
  rlp = require('readline-prompter'),
  // File variable includes
  World = require("./world").World,
  SocketConnection = require("./socketConnection").Connection;


function init() {
  var tokens = ['height', 'width', 'port'];
  rlp(tokens).end(function(results){
    console.log(results);
    var world = new World(results.height, results.width);
    var connection = new SocketConnection(results.port);
  });
};

init();