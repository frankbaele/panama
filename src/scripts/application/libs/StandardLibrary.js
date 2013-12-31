define(['World', 'EventManager'], function (world, eventManager) {
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
  function checkWait(conditionFunction, resultFunction) {
    var tev = setInterval(function () {
      if (conditionFunction()) {
        resultFunction
        clearInterval(tev);
      }
    }, 1000);
  };
  return {
    isoToTwoD: isoToTwoD,
    twoDToIso: twoDToIso,
    checkWait: checkWait
  };
});