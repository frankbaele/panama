function Game() {
  'use strict';
  var
    // Canvases
    mapCanvas,
    playerCanvas,
    mapCtx,
    playerCtx,
    // General global variables
    visible = ({x : 20, y : 20}),
    mapCenter = {x: 0, y:0},
    mouse,
    keys,
    commandQueue,
    cycle = 0,
    redrawMap = true;
    // the first grid on the canvas in the left upper corner.

  function init() {
    // Declare the canvases and rendering contexts
    mapCanvas = document.getElementById("mapCanvas");
    playerCanvas = document.getElementById("playerCanvas");
    mapCtx = mapCanvas.getContext("2d");
    playerCtx = playerCanvas.getContext("2d");
    // Initialise keyboard controls
    mouse = new Mouse();
    keys = new Keys();
    setEventHandlers();
    world = new World();

    visible.x = window.outerWidth.roundTo(world.tileWidth)/world.tileWidth/2;
    visible.y = window.outerHeight.roundTo(world.tileHeight)/world.tileHeight/2;
    mapCanvas.width = world.width * world.tileWidth;
    mapCanvas.height = world.height * world.tileHeight;

    playerCanvas.width = world.width * world.tileWidth;
    playerCanvas.height = world.height * world.tileHeight;
    helper.centerMap(mapCenter.x, mapCenter.y, visible);

    animate();
    gameCycle();
  }

  /**************************************************
   ** GAME EVENT HANDLERS
   **************************************************/
  function setEventHandlers () {
    window.addEventListener("resize", onResize, false);
    window.addEventListener("keydown", onKeydown, false);
    window.addEventListener("keyup", onKeyup, false);
    playerCanvas.addEventListener("click", mouse.onClick, false);
  }

  // Browser window resize
  function onResize() {
    visible.x = window.outerWidth.roundTo(world.tileWidth)/world.tileWidth/2;
    visible.y = window.outerHeight.roundTo(world.tileHeight)/world.tileHeight/2;
    helper.centerMap(mapCenter.x, mapCenter.y, visible);
  }
  // Keyboard key down
  function onKeydown(e) {
    keys.onKeyDown(e);
  }

  // Keyboard key up
  function onKeyup(e) {
    keys.onKeyUp(e);
  }

  /**************************************************
   ** GAME ANIMATION LOOP
   **************************************************/
  function animate() {
    moveMap();
    draw();
    // Request a new animation frame using Paul Irish's shim
    window.requestAnimFrame(animate);
  }
  /**************************************************
   ** GAME CYCLE LOOP
   **************************************************/
  function gameCycle() {
    // Call next cycle.
    setTimeout(gameCycle, 200);
    // Execute the previous cycle Commands.
    excuteCycle(commandQueue);
    // Generate commands to executed next cycle.
    cycle++;
  }
  function excuteCycle(commandQueue){

  }
  /**************************************************
   ** Map panning code
   **************************************************/
  function moveMap() {
    var inbound = {x:0, y:0};
    if (keys.up) {
      inbound.y--;
      inbound.x--;
    }
    if (keys.down) {
      inbound.y++;
      inbound.x++;
    }
    if (keys.left) {
      inbound.x--;
      inbound.y++;
    }
    if (keys.right) {
      inbound.x++;
      inbound.y--;
    }
    // Only update the map position if there is a change.
    if(inbound.x !== 0 || inbound.y !== 0){
      inbound = helper.inBoundTile(mapCenter.x + inbound.x, mapCenter.y + inbound.y);
      helper.centerMap(inbound.x, inbound.y, visible);
      mapCenter.x = inbound.x;
      mapCenter.y = inbound.y;
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
    getVisible: getVisible,
    getMapContext: getMapContext,
    getMapCanvas: getMapCanvas,
    getPlayerContext: getPlayerContext,
    getPlayerCanvas: getPlayerCanvas
  };
}

