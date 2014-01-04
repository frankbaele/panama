define(['EventManager', 'Sprite', 'STL', 'World', 'Canvas', 'underscore'], function (eventManager, sprite, stl, world, canvas) {
  var visible = {x:10, y:10};
  var ActorList = [];
  var centerCoordinates = {x: 10, y:10};
  var pressedKeys = {
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
    _.each(ActorList,function(actor){
      sprite.draw(actor.sprite, actor.coordinates.x, actor.coordinates.y, 'player');
    });
  }

  function center(posX,posY){
    // transform the grid tile to iso coordinates
    var coordinates = stl.twoDToIso(posX, posY);
    // transform the coordinates to the actual size of the map
    coordinates.x = -((coordinates.x - visible.x) * world.tileWidth + ((canvas.player.canvas.width) / 2));
    coordinates.y = -((coordinates.y - visible.y) * world.tileHeight + world.tileHeight/2);
    $(canvas.player.canvas).css('margin-left', coordinates.x).css('marginTop', coordinates.y);
    $(canvas.player.canvas).css('margin-left', coordinates.x).css('marginTop', coordinates.y);
  }

  eventManager.subscribe('ActorCreate', function(actor){
    ActorList.push({
      guid: actor.guid,
      coordinates: actor.coordinates,
      sprite: actor.sprite
    });
  });

  eventManager.subscribe('ActorUpdate', function(actor){
    var oldActor = _.findWhere(ActorList, {guid: actor.guid});
    sprite.draw('water.png', oldActor.coordinates.x, oldActor.coordinates.y, 'player');
    ActorList = _.without(ActorList, oldActor);
    ActorList.push({
      guid: actor.guid,
      coordinates: actor.coordinates,
      sprite: actor.sprite
    });
  });

  eventManager.subscribe('ActorDelete', function(actor){
    // delete the give Actor from the list
    ActorList = _.without(ActorList, _.findWhere(ActorList, {guid: actor.guid}));
  });

  eventManager.subscribe('newFrame', function(){update();});
  eventManager.subscribe('panUp', function(e){pressedKeys.up = e;});
  eventManager.subscribe('panDown', function(e){pressedKeys.down = e;});
  eventManager.subscribe('panLeft', function(e){pressedKeys.left = e;});
  eventManager.subscribe('panRight', function(e){pressedKeys.right = e;});

  init();
});