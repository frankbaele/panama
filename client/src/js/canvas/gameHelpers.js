/**************************************************
 ** HELPER FUNCTIONS
 **************************************************/
var HelperConstructor = function () {
  "use strict";

};

HelperConstructor.prototype.isoToTwoD = function (coords) {
  var newCoords = {};
  newCoords.x = (coords.y + coords.x);
  newCoords.y = (coords.y - coords.x);
  return newCoords;
};
HelperConstructor.prototype.twoDToIso = function (coords) {
  var newCoords = {};
  newCoords.x = ((coords.x - coords.y) / 2);
  newCoords.y = ((coords.x + coords.y) / 2);
  return newCoords;
};
HelperConstructor.prototype.getTileCoordinates = function () {

};
HelperConstructor.prototype.checkWait = function (conditionFunction, resultFunction) {
  var tev = setInterval(function () {
    if (conditionFunction()) {
      resultFunction();
      clearInterval(tev);
    }
  }, 1000);
};
HelperConstructor.prototype.drawSprite = function (spriteName, posX, posY, layer) {
  var unoTile = game.getUnoTile();
  var visible = game.getVisible();
  var canvas = game.getCanvasStats();
  posX = posX - unoTile.x;
  posY = posY - unoTile.y;
  // transform the grid tile to iso coordinates
  var coords = helper.twoDToIso({x: posX, y: posY});
  // transform the coordinates to the actual size of the map

  coords.x = coords.x * world.tileWidth + (world.tileWidth * visible.x) / 2;
  coords.y = coords.y * world.tileHeight;
  if (coords.x > canvas.x || (coords.x + game.getTileWidth()) <= 0){
    return;
  }
  if (coords.y > canvas.y ||(coords.y + game.getTileHeight()) <= 0){
    return;
  }

  var spt,
    mapTrans = {},
    context,
    img;
  // For lop trough all the atlasses with find, because we want to exit this loop when the atlas is found.
  _.find(assets.loaded.atlas, function (sheet) {
    // Search for a sprite with the same sprite name
    spt = _.findWhere(sheet.sprite.sprites, {id: spriteName});
    img = sheet.sprite.img;
    // exit find loop when sprite is found.
    if (!_.isEmpty(spt)) {
      return;
    }
  });

  if (_.isEmpty(spt)) {
    return;
  }

  //lookup the context
  switch (layer) {
    case 'map' :
      context = game.getMapContext();
      break;
    case 'player' :
      context = game.getPlayerContext();
      break;
    default:
      return;
  }
  var hlf = {x: spt.cx, y: spt.cy};
  mapTrans.x = 0;
  mapTrans.y = 0;
  context.drawImage(img,
    spt.x, spt.y,
    spt.w, spt.h,
    (coords.x + hlf.x),
    (coords.y + hlf.y),
    game.getTileWidth(),
    game.getTileHeight());
};
HelperConstructor.prototype.OutOfBound = function (posX, posY) {
  if (posX >= 0 && posY >= 0) {
    if (posX < world.width) {
      if (posY < world.height) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  } else {
    return true;
  }
};
HelperConstructor.prototype.inBoundUnoTile = function (posX, posY, visible) {
  // check if the unoTile is inbound and correct if not
  if (this.OutOfBound(posX, posY)) {
    if (posX <= 0) {
      posX = 0;
    } else if (posX >= world.width) {
      posX = world.width - 1;
    }

    if (posY <= 0) {
      posY = 0;
    } else if (posY >= world.height) {
      posY = world.height - 1;
    }
  }
  // correct the X unotile to show the max visible field

  if (posX + visible.x > world.width) {
    var correctionX = world.width - (posX + visible.x);
    posX = posX + correctionX;
  }

  // correct the Y unotile to show the max visible field

  if (posY + visible.y > world.height) {
    var correctionY = world.height - (posY + visible.y);
    posY = posY + correctionY;
  }

  return {x: posX, y: posY};
};
HelperConstructor.prototype.tileIsOpen = function(tileIndex) {
  if(world.mapData[tileIndex.y][tileIndex.x] === 0){
    return true;
  } else {
    return false;
  }
};
HelperConstructor.prototype.generateStartPosition =  function (callback) {
  var visible = game.getVisible();
  var startGridPosition = ({
    x : (Math.round(Math.random() * (world.width -1))),
    y : (Math.round(Math.random() * (world.height -1)))
  });
  while(!this.tileIsOpen(startGridPosition)){
    startGridPosition = ({
      x : (Math.round(Math.random() * (world.width -1))),
      y : (Math.round(Math.random() * (world.height-1)))
    });
  }

  // Calculate the uno position based on the starting position and corrected with visible range of the map.
  // Check if the visible map correction is not crossing the map borders in either way, otherwise make correction and show more from the other side.
  var unoTile = helper.inBoundUnoTile(startGridPosition.x - visible.x/2, startGridPosition.y - visible.y/2, visible);
  game.setUnoTile(unoTile.x, unoTile.y);
  callback(startGridPosition);
}
var helper = new HelperConstructor();

HTMLCanvasElement.prototype.relMouseCoords = function (event) {
  var totalOffsetX = 0;
  var totalOffsetY = 0;
  var canvasX = 0;
  var canvasY = 0;
  var currentElement = this;

  do {
    totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
    totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
  }
  while (currentElement === currentElement.offsetParent);

  canvasX = event.pageX - totalOffsetX;
  canvasY = event.pageY - totalOffsetY;
  return {x: canvasX, y: canvasY};
};

Number.prototype.roundTo = function (num) {
  var resto = this % num;
  if (resto <= (num / 2)) {
    return this - resto;
  } else {
    return this + num - resto;
  }
};