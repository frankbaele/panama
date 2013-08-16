function Game() {
  'use strict';
  var canvas,       // Canvas DOM element
    ctx,            // Canvas rendering context
    localPlayer,    // Local player
    remotePlayers,  // remote players
    socket,         // socket io
    keys,
    mouse,
    world;

  function init() {
    // Declare the canvas and rendering context
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    // Add the mouse click function.

    // Maximise the canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialise keyboard controls
    mouse = new Mouse();
    // Calculate a random start position for the local player
    var startGridPosition = ({
      x : (Math.round(Math.random()) * 1),
      y : (Math.round(Math.random()) * 1)
    });


    // Initialise the local player
    localPlayer = new Player(startGridPosition);
    // Change this to the ip of the server
    socket = io.connect("localhost", {port: 8000, transports: ["websocket"]});
    // Start listening for events
    remotePlayers = [];
    setEventHandlers();
  }


  /**************************************************
   ** GAME EVENT HANDLERS
   **************************************************/
  function setEventHandlers () {
    window.addEventListener("resize", onResize, false);
    canvas.addEventListener("click", mouse.onClick, false);

    socket.on("connect", onSocketConnected);
    socket.on("disconnect", onSocketDisconnect);
    socket.on("new player", onNewPlayer);
    socket.on("move player", onMovePlayer);
    socket.on("remove player", onRemovePlayer);
    socket.on("world", onWorld);
  }

  // Browser window resize
  function onResize(e) {
    // Maximise the canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function onSocketConnected() {
    socket.emit("new player", localPlayer.getGridPosition());
  }

  function onSocketDisconnect() {

  }

  function onNewPlayer(data) {
    var newPlayer = new Player(data);
    newPlayer.id = data.id;
    remotePlayers.push(newPlayer);
  }

  function onMovePlayer(data) {
    var movePlayer = playerById(data.id);

    if (!movePlayer) {
      console.log("Player not found: " + data.id);
      return;
    }

    movePlayer.setGridPosition(data.gridPosition);
  }

  function onRemovePlayer(data) {
    var removePlayer = playerById(data.id);

    if (!removePlayer) {
      console.log("Player not found: " + data.id);
      return;
    }

    remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
  }

  function onWorld(data){
    console.log(data);
    world = data;
  }

  /**************************************************
   ** GAME ANIMATION LOOP
   **************************************************/
  function animate() {
    update();
    draw();

    // Request a new animation frame using Paul Irish's shim
    window.requestAnimFrame(animate);
  }

  /**************************************************
   ** GAME UPDATE
   **************************************************/
  function update() {
    if (localPlayer.getMove()) {
      localPlayer.update();
      socket.emit("move player", localPlayer.getGridPosition());
    }
  }

  /**************************************************
   ** GAME DRAW
   **************************************************/
  function draw() {
    // Wipe the canvas clean
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the local player
    localPlayer.draw(ctx);
    var i;
    for (i = 0; i < remotePlayers.length; i++) {
      remotePlayers[i].draw(ctx);
    }
  }
  function playerById(id) {
    var i;
    for (i = 0; i < remotePlayers.length; i++) {
      if (remotePlayers[i].id == id)
        return remotePlayers[i];
    }
    return false;
  }
  var  getLocalplayer = function () {
    return localPlayer;
  };
  var getCanvas = function () {
    return canvas;
  };
  return {
    init: init,
    animate: animate,
    canvas: getCanvas,
    localPlayer: getLocalplayer
  };
  exports.Game = Game;
}

