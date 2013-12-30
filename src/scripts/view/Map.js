define(['EventManager', 'Canvas', 'World', 'STL', 'Sprite', 'jQuery'], function (eventManager, canvas, world, stl, sprite) {
  var visible = {x:10, y:10};
  var centerCoords = {x: 10, y:10};
  var pressedKeys = {
    up: 0,
    down: 0,
    left: 0,
    right: 0
  };

  function init(){
    draw();
    center(centerCoords.x, centerCoords.y);
    eventManager.subscribe( 'map up', function(e){pressedKeys.up = e;});
    eventManager.subscribe( 'map down', function(e){pressedKeys.down = e});
    eventManager.subscribe( 'map left', function(e){pressedKeys.left = e});
    eventManager.subscribe( 'map right', function(e){pressedKeys.right = e});
  }

  function draw() {
    canvas.terrain.context.clearRect(0, 0, canvas.terrain.canvas.width, canvas.terrain.canvas.height);
    var coords = {x:0, y:0};
    for (var i = 0; world.height > i; i++) {
      for (var j = 0; world.width> j; j++){
        if(!world.outOfBound(coords.y + i,coords.x + j)){
          if (world.mapData[coords.y + i][coords.x + j] === 1){
            sprite.draw("sand.png", coords.x + j, coords.y + i, "terrain");
          } else {
            sprite.draw("water.png", coords.x + j, coords.y + i, "terrain");
          }
        }
      }
    }
  }

  /**************************************************
   ** Map panning code
   **************************************************/
  function center(posX,posY){
    // transform the grid tile to iso coordinates
    var coords = stl.twoDToIso(posX, posY);
    // transform the coordinates to the actual size of the map
    coords.x = -((coords.x - visible.x) * world.tileWidth + ((canvas.terrain.canvas.width) / 2));
    coords.y = -((coords.y - visible.y) * world.tileHeight + world.tileHeight/2);
    $(canvas.terrain.canvas).css('margin-left', coords.x).css('marginTop', coords.y);
    $(canvas.terrain.canvas).css('margin-left', coords.x).css('marginTop', coords.y);
  }

  function update() {
    var inbound = {x:0, y:0};
    if (pressedKeys.up == 1) {
      inbound.y--;
      inbound.x--;
    }
    if (pressedKeys.down == 1) {
      inbound.y++;
      inbound.x++;
    }
    if (pressedKeys.left == 1) {
      inbound.x--;
      inbound.y++;
    }
    if (pressedKeys.right == 1) {
      inbound.x++;
      inbound.y--;
    }
    // Only update the map position if there is a change.
    if(inbound.x !== 0 || inbound.y !== 0){
      inbound = world.inBoundTile(centerCoords.x + inbound.x, centerCoords.y + inbound.y);
      center(inbound.x, inbound.y);
      centerCoords.x = inbound.x;
      centerCoords.y = inbound.y;
    }
  }

  return {
    init: init,
    draw: draw,
    update: update,
    center: center,
    centerCoords: centerCoords
  };
});