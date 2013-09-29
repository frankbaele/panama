var SocketConnection = function(port, generatedWorld) {
  var
  io = require("socket.io"),
  util = require("util"),
  Player = require("./player").Player,
  players,
  socket;

  function init() {
    players = [];
    // Parse to integer, readline returns a string.
    socket = io.listen(8000);
    socket.configure(function () {
      socket.set("transports", ["websocket"]);
      socket.set("log level", 2);
    });

    socket.sockets.on("connection", onSocketConnection);
  }
  function onSocketConnection(client) {
    util.log("New player has connected: "  + client.id);
    client.emit('world', generatedWorld);
    client.on("disconnect", onClientDisconnect);
    client.on("new player", onNewPlayer);
    client.on("move player", onMovePlayer);
  }
  function onClientDisconnect() {
    var removePlayer = playerById(this.id);

    if (!removePlayer) {
      util.log("Player not found: " + this.id);
      return;
    }

    players.splice(players.indexOf(removePlayer), 1);
    this.broadcast.emit("remove player", {id: this.id});

  }

  function onNewPlayer(data) {
    var newPlayer = new Player(data);
    newPlayer.id = this.id;

    // inform the other players there is a new player.
    this.broadcast.emit("new player", {id: newPlayer.id, gridPosition: newPlayer.getGridPosition()});

    // Emit the existing players to the connecting player.
    var i, existingPlayer;
    for (i = 0; i < players.length; i++) {
      existingPlayer = players[i];
      this.emit("new player", {id: existingPlayer.id, gridPosition: existingPlayer.getGridPosition()});
    };
    // Add the new player tot the players array.
    players.push(newPlayer);

  }

  function onMovePlayer(data) {
    var movePlayer = playerById(this.id);

    if (!movePlayer) {
      util.log("Player not found: " + this.id);
      return;
    }

    movePlayer.setGridPostion(data);

    this.broadcast.emit("move player", {id: movePlayer.id, gridPosition: movePlayer.getGridPosition()});
  }

  function playerById(id) {
    var i;
    for (i = 0; i < players.length; i++) {
      if (players[i].id == id)
        return players[i];
    }
    return false;
  }

  init();
};

exports.Connection = SocketConnection;