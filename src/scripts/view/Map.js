define(['EventManager', 'Canvas', 'World', 'STL', 'Sprite', 'jQuery'], function (eventManager, canvas, world, stl, sprite) {
  var visible = {x:10, y:10};
  var centerCoordinates = {x: 10, y:10};
  var pressedKeys = {
    up: 0,
    down: 0,
    left: 0,
    right: 0
  };

  function init(){
    draw();
    center(centerCoordinates.x, centerCoordinates.y);
  }

  function draw() {
    canvas.terrain.context.clearRect(0, 0, canvas.terrain.canvas.width, canvas.terrain.canvas.height);
    var coordinates = {x:0, y:0};
    for (var i = 0; world.height > i; i++) {
      for (var j = 0; world.width> j; j++){
        if(!world.outOfBound(coordinates.y + i,coordinates.x + j)){
          if (world.mapData[coordinates.y + i][coordinates.x + j] === 1){
            sprite.draw("sand.png", coordinates.x + j, coordinates.y + i, "terrain");
          } else {
            sprite.draw("water.png", coordinates.x + j, coordinates.y + i, "terrain");
          }
        }
      }
    }
  }

  function center(posX,posY){
    // transform the grid tile to iso coordinates
    var coordinates = stl.twoDToIso(posX, posY);
    // transform the coordinates to the actual size of the map
    coordinates.x = -((coordinates.x - visible.x) * world.tileWidth + ((canvas.terrain.canvas.width) / 2));
    coordinates.y = -((coordinates.y - visible.y) * world.tileHeight + world.tileHeight/2);
    $(canvas.terrain.canvas).css('margin-left', coordinates.x).css('marginTop', coordinates.y);
    $(canvas.terrain.canvas).css('margin-left', coordinates.x).css('marginTop', coordinates.y);
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
      inbound = world.inBoundTile(centerCoordinates.x + inbound.x, centerCoordinates.y + inbound.y);
      center(inbound.x, inbound.y);
      centerCoordinates.x = inbound.x;
      centerCoordinates.y = inbound.y;
    }
  }
  eventManager.subscribe('assets.loaded', function(){init();});
  eventManager.subscribe('new.frame', function(){update();});
  eventManager.subscribe('pan.up', function(e){pressedKeys.up = e;});
  eventManager.subscribe('pan.down', function(e){pressedKeys.down = e;});
  eventManager.subscribe('pan.left', function(e){pressedKeys.left = e;});
  eventManager.subscribe('pan.right', function(e){pressedKeys.right = e;});
});