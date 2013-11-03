function Game() {
  'use strict';
  var
    // Canvases
    mapCanvas,
    playerCanvas,
    mapCtx,
    playerCtx,
    // General global variables
    visible = ({x : 5, y : 10}),
    localPlayer,    // Local player
    mapCenter = {x: 0, y:0},
    mouse,
    redrawMap = true,
    redrawPlayers = true;
    // the first grid on the canvas in the left upper corner.

  function init() {
    // Declare the canvases and rendering contexts
    mapCanvas = document.getElementById("mapCanvas");
    playerCanvas = document.getElementById("playerCanvas");
    mapCtx = mapCanvas.getContext("2d");
    playerCtx = playerCanvas.getContext("2d");
    // Initialise keyboard controls
    mouse = new Mouse();
    setEventHandlers();
    world = new World();

    visible.x = window.outerWidth.roundTo(world.tileWidth)/world.tileWidth/2;
    visible.y = window.outerHeight.roundTo(world.tileHeight)/world.tileHeight/2;
    mapCanvas.width = world.width * world.tileWidth;
    mapCanvas.height = world.height * world.tileHeight;

    playerCanvas.width = world.width * world.tileWidth;
    playerCanvas.height = world.height * world.tileHeight;
    generateNewLocalPlayer();
    helper.centerMap(mapCenter.x, mapCenter.y, visible);
  }

  /**************************************************
   ** GAME EVENT HANDLERS
   **************************************************/
  function setEventHandlers () {
    window.addEventListener("resize", onResize, false);
    playerCanvas.addEventListener("click", mouse.onClick, false);
  }

  // Browser window resize
  function onResize() {
    visible.x = window.outerWidth.roundTo(world.tileWidth)/world.tileWidth/2;
    visible.y = window.outerHeight.roundTo(world.tileHeight)/world.tileHeight/2;
    helper.centerMap(mapCenter.x, mapCenter.y, visible);
  }
  function generateNewLocalPlayer() {
    helper.generateStartPosition(function (startGridPosition) {

      // Initialise the local player
      mapCenter = startGridPosition;
      localPlayer = new Player(startGridPosition);
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
    mapCtx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
    var coords = {x:0, y:0};
    for (var i = 0; world.height > i; i++) {
      for (var j = 0; world.width> j; j++){
        if(!helper.OutOfBound(coords.y + i,coords.x + j)){
          if (world.mapData[coords.y + i][coords.x + j] === 1){
            helper.drawSprite("sand.png", coords.x + j, coords.y + i, "map");
          } else {
            helper.drawSprite("water.png", coords.x + j, coords.y + i, "map");
          }
        }
      }
    }

    redrawMap = false;
  }
  function drawPlayers() {
    playerCtx.clearRect(0, 0, playerCanvas.width, playerCanvas.height);
    localPlayer.draw();
    redrawPlayers = false;
  }
  // Variables that you want to be globaly available.
  var getLocalplayer = function () {
    return localPlayer;
  };
  var getMapContext = function () {
    return mapCtx;
  };

  var getMapCanvas = function () {
    return mapCanvas;
  };
  var getPlayerContext = function () {
    return playerCtx;
  };
  var getVisible = function () {
    return visible;
  };
  var getPlayerCanvas = function() {
    return playerCanvas;
  };

  return {
    init: init,
    animate: animate,
    getVisible: getVisible,
    getLocalPlayer: getLocalplayer,
    localPlayer: getLocalplayer,
    getMapContext: getMapContext,
    getMapCanvas: getMapCanvas,
    getPlayerContext: getPlayerContext,
    getPlayerCanvas: getPlayerCanvas
  };
}

