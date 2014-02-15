define(['eventmanager', 'canvas', 'world', 'standardlib', 'sprite', 'jQuery'], function (eventmanager, canvas, world, standardlib, sprite) {
  var visible = {x:10, y:10};
  var centerCoordinates = {x: 10, y:10};
  var pressedkeys = {
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
    var coordinates = standardlib.twoDToIso(posX, posY);
    // transform the coordinates to the actual size of the map
    coordinates.x = -((coordinates.x - visible.x) * world.tileWidth + ((canvas.terrain.canvas.width) / 2));
    coordinates.y = -((coordinates.y - visible.y) * world.tileHeight + world.tileHeight/2);
    $(canvas.terrain.canvas).css('margin-left', coordinates.x).css('marginTop', coordinates.y);
    $(canvas.terrain.canvas).css('margin-left', coordinates.x).css('marginTop', coordinates.y);
  }

  function update() {
    var inbound = {x:0, y:0};
    if (pressedkeys.up == 1) {
      inbound.y--;
      inbound.x--;
    }
    if (pressedkeys.down == 1) {
      inbound.y++;
      inbound.x++;
    }
    if (pressedkeys.left == 1) {
      inbound.x--;
      inbound.y++;
    }
    if (pressedkeys.right == 1) {
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
  eventmanager.subscribe('game.init', function(){init();});
  eventmanager.subscribe('new.frame', function(){update();});
  eventmanager.subscribe('pan.up', function(e){pressedkeys.up = e;});
  eventmanager.subscribe('pan.down', function(e){pressedkeys.down = e;});
  eventmanager.subscribe('pan.left', function(e){pressedkeys.left = e;});
  eventmanager.subscribe('pan.right', function(e){pressedkeys.right = e;});
});