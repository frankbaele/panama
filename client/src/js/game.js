function Game() {
  'use strict';
  var
    // Canvases
    mapCanvas,
    gameCanvas,
    userCanvas,
    mapCtx,
    playerCtx,
    userCtx,
    // General canvas specs.
    canvasHeight,
    canvasWidth,
    // General global variables
    unoTile = ({x : 0, y : 0}),
    tileWidth,  //default value for the tileWidth is 32
    tileHeight,
    localPlayer,    // Local player
    remotePlayers,  // remote players
    socket,         // socket io
    mouse,
    redrawMap = true,
    redrawPlayers = true;
    // the first grid on the canvas in the left upper corner.

  function init() {
    // Declare the canvases and rendering contexts
    mapCanvas = document.getElementById("mapCanvas");
    gameCanvas = document.getElementById("playerCanvas");
    userCanvas = document.getElementById("userCanvas");
    mapCtx = mapCanvas.getContext("2d");
    playerCtx = gameCanvas.getContext("2d");
    userCtx = gameCanvas.getContext("2d");
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
  function onResize() {
    // Maximise the canvas
    canvasWidth = window.innerWidth.roundTo(tileWidth);
    // If the canvas with is greater then the window we subtract a gridSize to make it fit in the window.
    canvasWidth = canvasWidth > window.innerWidth ? canvasWidth - tileWidth : canvasWidth;
    canvasWidth = canvasWidth > tileWidth * world.width * 2 ? tileWidth * world.width * 2 : canvasWidth;

    canvasHeight = window.innerHeight.roundTo(tileWidth);
    // If the canvas height is greater then the window we subtract a gridSize to make it fit in the window.
    canvasHeight = canvasHeight > window.innerWidth ? canvasHeight - tileWidth : canvasHeight;
    canvasHeight = canvasHeight > tileWidth * world.height * 2 ? tileWidth * world.height * 2  : canvasHeight;

    mapCanvas.width = canvasWidth;
    mapCanvas.height = canvasHeight;
    gameCanvas.width = canvasWidth;
    gameCanvas.height = canvasHeight;
    userCanvas.width = canvasWidth;
    userCanvas.height = canvasHeight;
    redrawMap = true;
  }

  function onNewPlayer(data) {
    var newPlayer = new Player(data.gridPosition);
    newPlayer.id = data.id;
    remotePlayers.push(newPlayer);
    redrawPlayers = true;
  }

  function onMovePlayer(data) {
    var movePlayer = playerById(data.id);

    if (!movePlayer) {
      console.log("Player not found: " + data.id);
      return;
    }

    movePlayer.setGridPosition(data.gridPosition);
    redrawPlayers = true;
  }

  function onRemovePlayer(data) {
    var removePlayer = playerById(data.id);

    if (!removePlayer) {
      console.log("Player not found: " + data.id);
      return;
    }

    remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
    redrawPlayers = true;
  }

  function onWorld(data){
    world = data;
    tileWidth = data.tileWidth;
    tileHeight = data.tileHeight;
    generateNewLocalPlayer();
  }

  function generateNewLocalPlayer() {
    generateStartPosition(function (startGridPosition) {
      // Initialise the local player
      localPlayer = new Player(startGridPosition);
      socket.emit("new player", localPlayer.getGridPosition());
      // Run the resize command once for init, now the world and player data is known.
      onResize();
      // So when the new player object is created, start animating it.
      animate();
    });
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
    // Only update the map canvas if a map update is requested by the game
    if (redrawMap) {
      drawMap();
    }
    // Only updtae the player canvas if a player moves in the canvas
    if (redrawPlayers) {
      drawPlayers();
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
  function drawMap() {
    mapCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    console.log(world);
    for (var i = 0; world.height > i; i++) {
      for (var j = 0; world.width > j; j++){
        if (world.mapData[i][j] === 1){
          var coords = helper.twoDToIso({x:j,y: i});
          helper.drawSprite("ts_beach0/straight/135/0.png", coords.x*tileWidth + (world.tileWidth * world.width)/2, coords.y*tileHeight, "map");
        } else {
          var coords = helper.twoDToIso({x:j,y: i});
          helper.drawSprite("ts_shallow-deep0/curve_out/45/0.png", coords.x*tileWidth + (world.tileWidth * world.width)/2, coords.y*tileHeight, "map");
        }
      }
    }

    redrawMap = false;
  }
  function drawPlayers() {
    //glocalPlayer.draw(playerCtx, world.tileWidth);
    for (var i = 0; i < remotePlayers.length; i++) {
      remotePlayers[i].draw(playerCtx, world.tileWidth);
    }
    redrawPlayers = false;
  }
  function tileIsOpen(tileIndex) {
    if(world.mapData[tileIndex.y][tileIndex.x] === 0){
      return true;
    } else {
      return false;
    }
  }
  function generateStartPosition(callback) {
    var startGridPosition = ({
      x : (Math.round(Math.random() * (world.width -1))),
      y : (Math.round(Math.random() * (world.height -1)))
    });
    while(!tileIsOpen(startGridPosition)){
      startGridPosition = ({
        x : (Math.round(Math.random() * (world.width -1))),
        y : (Math.round(Math.random() * (world.height-1)))
      });
    }
    callback(startGridPosition);
  }
  // Variables that you want to be globaly available.
  var getLocalplayer = function () {
    return localPlayer;
  };
  var getCanvas = function () {
    return userCanvas;
  };
  var getMapContext = function () {
    return mapCtx;
  };
  var getTileWidth = function () {
    return tileWidth;
  };
  var getTileHeight = function () {
    return tileHeight;
  };
  return {
    init: init,
    animate: animate,
    getTileWidth: getTileWidth,
    getTileHeight: getTileHeight,
    canvas: getCanvas,
    localPlayer: getLocalplayer,
    getMapContext: getMapContext
  };
}

