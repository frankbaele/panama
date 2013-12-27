define(['jQuery','Canvas', 'World', 'STL', 'Sprite', 'Keys'], function (jQuery, canvas, world, stl, sprite, keys) {
  var visible = {x:10, y:10};
  var mapCenter = {x: 10, y:10};
  function init(){
    center(mapCenter.x, mapCenter.y, visible);
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
  function move() {
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
      inbound = world.inBoundTile(mapCenter.x + inbound.x, mapCenter.y + inbound.y);
      center(inbound.x, inbound.y);
      mapCenter.x = inbound.x;
      mapCenter.y = inbound.y;
    }
  }
  function center(posX,posY){
    // transform the grid tile to iso coordinates
    var coords = stl.twoDToIso(posX, posY);
    // transform the coordinates to the actual size of the map
    coords.x = -((coords.x - visible.x) * world.tileWidth + ((canvas.terrain.canvas.width) / 2));
    coords.y = -((coords.y - visible.y) * world.tileHeight + world.tileHeight/2);
    $(canvas.terrain.canvas).css('margin-left', coords.x).css('marginTop', coords.y);
    $(canvas.terrain.canvas).css('margin-left', coords.x).css('marginTop', coords.y);
  }

  init();
  return {
    draw: draw,
    move: move,
    center: center
  };
});