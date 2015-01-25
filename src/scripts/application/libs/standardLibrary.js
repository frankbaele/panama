define(['world', 'eventmanager'], function (world, eventmanager) {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  function isoToTwoD(posX, posY) {
    var newCoordinates = {};
    newCoordinates.x = (posY + posX);
    newCoordinates.y = (posY - posX);
    return newCoordinates;
  };
  function twoDToIso(posX, posY) {
    var newCoordinates = {};
    newCoordinates.x = ((posX - posY) / 2);
    newCoordinates.y = ((posX + posY) / 2);
    return newCoordinates;
  };

  function worldPosToGridPos(PosX, PosY){
    // todo Rewrite me -> new canvas
    var gridPosX = (PosX / (world.tileWidth/2) + PosY / (world.tileHeight/2))/2 - world.width/2;
    var gridPosY = (PosY / (world.tileHeight/2) - (PosX / (world.tileWidth/2)))/2 + world.height/2;
    gridPosX = Math.floor(gridPosX);
    gridPosY = Math.floor(gridPosY);
    return {x: gridPosX, y: gridPosY};
  };

  function checkWait(conditionFunction, resultFunction) {
    var tev = setInterval(function () {
      if (conditionFunction()) {
        resultFunction
        clearInterval(tev);
      }
    }, 1000);
  };
  function roundHalf(num) {
    num = Math.round(num*2)/2;
    return num;
  }
  return {
    guid: guid,
    isoToTwoD: isoToTwoD,
    twoDToIso: twoDToIso,
    worldPosToGridPos: worldPosToGridPos,
    checkWait: checkWait
  };
});