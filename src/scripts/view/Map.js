define(['Canvas', 'World', 'STL', 'Sprite', 'Assets'], function (canvas, world, stl, sprite, assets) {
  var visible = 10;

  function draw() {
    canvas.terrain.context.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
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
    /*
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
      inbound = stl.inBoundTile(mapCenter.x + inbound.x, mapCenter.y + inbound.y);
      center(inbound.x, inbound.y);
      mapCenter.x = inbound.x;
      mapCenter.y = inbound.y;
    }
    */
  }
  function center(posX,posY){
    // transform the grid tile to iso coordinates
    var coords = stl.twoDToIso(posX, posY);
    // transform the coordinates to the actual size of the map
    coords.x = -((coords.x-visible.x) * world.tileWidth + ((canvas.terrain.width) / 2));
    coords.y = -((coords.y-visible.y) * world.tileHeight + world.tileHeight/2);
    $(canvas.terrain).css('margin-left', coords.x).css('marginTop', coords.y);
    $(canvas.player).css('margin-left', coords.x).css('marginTop', coords.y);
  }
  return {
    draw: draw,
    move: move,
    center: center
  };
});