function Game() {
  'use strict';
  var mapCanvas,
    gameCanvas,
    userCanvas,
    mapCtx,
    playerCtx,
    userCtx,
    localPlayer,    // Local player
    remotePlayers,  // remote players
    socket,         // socket io
    keys,
    mouse,
    // the first grid on the canvas in the left upper corner.
    unoGrid = ({
      x : 1,
      y : 1
    }),
    world;

  function init() {
    // Declare the canvases and rendering contexts
    mapCanvas = document.getElementById("mapCanvas");
    gameCanvas = document.getElementById("playerCanvas");
    userCanvas = document.getElementById("userCanvas");
    mapCtx = mapCanvas.getContext("2d");
    playerCtx = gameCanvas.getContext("2d");
    userCtx = gameCanvas.getContext("2d");
    // Maximise the canvas
    mapCanvas.width = window.innerWidth.roundTo(32);
    mapCanvas.height = window.innerHeight.roundTo(32);
    gameCanvas.width = window.innerWidth.roundTo(32);
    gameCanvas.height = window.innerHeight.roundTo(32);
    userCanvas.width = window.innerWidth.roundTo(32);
    userCanvas.height = window.innerHeight.roundTo(32);

    // Initialise keyboard controls
    mouse = new Mouse();
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
    userCanvas.addEventListener("click", mouse.onClick, false);
    socket.on("new player", onNewPlayer);
    socket.on("move player", onMovePlayer);
    socket.on("remove player", onRemovePlayer);
    socket.on("world", onWorld);
  }

  // Browser window resize
  function onResize(e) {
    // Maximise the canvas
    mapCanvas.width = window.innerWidth.roundTo(32);
    mapCanvas.height = window.innerHeight.roundTo(32);
    gameCanvas.width = window.innerWidth.roundTo(32);
    gameCanvas.height = window.innerHeight.roundTo(32);
    userCanvas.width = window.innerWidth.roundTo(32);
    userCanvas.height = window.innerHeight.roundTo(32);
  }

  function onNewPlayer(data) {
    var newPlayer = new Player(data.gridPosition);
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
    world = data;
    generateNewLocalPlayer();
  }

  function generateNewLocalPlayer() {

    var startGridPosition = ({
      x : (Math.round(Math.random() * world.height)),
      y : (Math.round(Math.random() * world.width))
    });
    // Initialise the local player
    localPlayer = new Player(startGridPosition);
    socket.emit("new player", localPlayer.getGridPosition());
    // So when the new player object is created, start animating it.
    animate();
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
    return userCanvas;
  };
  return {
    init: init,
    animate: animate,
    canvas: getCanvas,
    localPlayer: getLocalplayer
  };
  exports.Game = Game;
}

