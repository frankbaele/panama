/**************************************************
 ** HELPER FUNCTIONS
 **************************************************/
var HelperConstructor = function () {
  "use strict";

};

HelperConstructor.prototype.isoToTwoD = function (posX, posY) {
  var newCoords = {};
  newCoords.x = (posY + posX);
  newCoords.y = (posY - posX);
  return newCoords;
};
HelperConstructor.prototype.twoDToIso = function (posX, posY) {
  var newCoords = {};
  newCoords.x = ((posX - posY) / 2);
  newCoords.y = ((posX + posY) / 2);
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
  var spt,
    mapTrans = {},
    context,
    canvas,
    coords,
    hlf,
    img;

  //lookup the context
  switch (layer) {
    case 'map' :
      context = game.getMapContext();
      canvas = game.getMapCanvas();
      break;
    case 'player' :
      context = game.getPlayerContext();
      canvas = game.getPlayerCanvas();
      break;
    default:
      return;
  }


  // transform the grid tile to iso coordinates
  coords = helper.twoDToIso(posX, posY);
  // transform the coordinates to the actual size of the map
  coords.x = coords.x * world.tileWidth + ((canvas.width) / 2);
  coords.y = coords.y * world.tileHeight + world.tileHeight/2;

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

  hlf = {x: spt.cx, y: spt.cy};
  mapTrans.x = 0;
  mapTrans.y = 0;
  context.drawImage(img,
    spt.x, spt.y,
    spt.w, spt.h,
    (coords.x + hlf.x),
    (coords.y + hlf.y),
    world.tileWidth,
    world.tileHeight);
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
HelperConstructor.prototype.inBoundUnoTile = function (posX, posY) {
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
  callback(startGridPosition);
};
HelperConstructor.prototype.worldPosToGridPos = function(PosX, PosY){
  /*
  var d = (this.mcBoundaryVectors.upper.x * this.mcBoundaryVectors.lower.y) - (this.mcBoundaryVectors.upper.y * this.mcBoundaryVectors.lower.x);

  var a = ((iPosX * this.mcBoundaryVectors.lower.y) - (this.mcBoundaryVectors.lower.x * iPosY)) / d;
  var b = ((this.mcBoundaryVectors.upper.x * iPosY) - (iPosX * this.mcBoundaryVectors.upper.y)) / d;

  var cParaUpperVec = new Vector2(a * this.mcBoundaryVectors.upper.x, a * this.mcBoundaryVectors.upper.y);
  var cParaLowerVec = new Vector2(b * this.mcBoundaryVectors.lower.x, b * this.mcBoundaryVectors.lower.y);

  var iGridX = Math.floor((cParaLowerVec.length() / this.mcBoundaryVectors.lower.length()) * world.width);
  var iGridY = Math.floor((cParaUpperVec.length() / this.mcBoundaryVectors.upper.length()) * world.height);

  return {gridX: iGridX, gridY: iGridY};
  */
};
HelperConstructor.prototype.centerMap = function (posX, posY, visible){
  var mapCanvas = game.getMapCanvas();
  var PlayerCanvas = game.getPlayerCanvas();
  // transform the grid tile to iso coordinates
  var coords = helper.twoDToIso(posX, posY);

  // transform the coordinates to the actual size of the map
  coords.x = -((coords.x-visible.x) * world.tileWidth + ((mapCanvas.width) / 2));
  coords.y = -((coords.y-visible.y) * world.tileHeight + world.tileHeight/2);
  $(mapCanvas).css('margin-left', coords.x).css('marginTop', coords.y);
  $(PlayerCanvas).css('margin-left', coords.x).css('marginTop', coords.y);
};

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