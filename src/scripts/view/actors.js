define(['eventmanager', 'sprite', 'standardlib', 'world', 'canvas', 'actorList', 'underscore'], function (eventmanager, sprite, standardlib, world, canvas, actorList) {
  var visible = {x:10, y:10};
  var centerCoordinates = {x: 10, y:10};
  var pressedkeys = {
    up: 0,
    down: 0,
    left: 0,
    right: 0
  };
  function init(){
    center(centerCoordinates.x, centerCoordinates.y);
  }

  function update() {
    var inbound = {x:0, y:0};
    if (pressedkeys.up == 1) {
      inbound.y--;0
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
    _.each(actorList.getCleanUpList(),function(actor){
      sprite.draw('water.png', actor.coordinates.x, actor.coordinates.y, 'player');
    });
    actorList.clearCleanUpList();
    _.each(actorList.getactorList(),function(actor){
      sprite.draw(actor.sprite, actor.coordinates.x, actor.coordinates.y, 'player');
    });
  }

  function center(posX,posY){
    // transform the grid tile to iso coordinates
    var coordinates = standardlib.twoDToIso(posX, posY);
    // transform the coordinates to the actual size of the map
    coordinates.x = -((coordinates.x - visible.x) * world.tileWidth + ((canvas.player.canvas.width) / 2));
    coordinates.y = -((coordinates.y - visible.y) * world.tileHeight + world.tileHeight/2);
    $(canvas.player.canvas).css('margin-left', coordinates.x).css('marginTop', coordinates.y);
    $(canvas.terrain.canvas).css('margin-left', coordinates.x).css('marginTop', coordinates.y);
  }

  eventmanager.subscribe('new.frame', function(){update();});
  eventmanager.subscribe('pan.up', function(e){pressedkeys.up = e;});
  eventmanager.subscribe('pan.down', function(e){pressedkeys.down = e;});
  eventmanager.subscribe('pan.left', function(e){pressedkeys.left = e;});
  eventmanager.subscribe('pan.right', function(e){pressedkeys.right = e;});
  eventmanager.subscribe('game.init', function(){init();});
});