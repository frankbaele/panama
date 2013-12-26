define(['World'], function (world) {
    var isoToTwoD = function (posX, posY) {
    var newCoords = {};
    newCoords.x = (posY + posX);
    newCoords.y = (posY - posX);
    return newCoords;
  };
  var twoDToIso = function (posX, posY) {
    var newCoords = {};
    newCoords.x = ((posX - posY) / 2);
    newCoords.y = ((posX + posY) / 2);
    return newCoords;
  };
  var checkWait = function (conditionFunction, resultFunction) {
    var tev = setInterval(function () {
      if (conditionFunction()) {
        resultFunction();
        clearInterval(tev);
      }
    }, 1000);
  };
  return {
    isoToTwoD: isoToTwoD,
    twoDToIso : twoDToIso,
    checkWait : checkWait
  };
});