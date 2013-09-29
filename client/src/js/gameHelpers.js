
/**************************************************
 ** HELPER FUNCTIONS
 **************************************************/
var HelperConstructor = function () {
  "use strict";

};

HelperConstructor.prototype.isoToTwoD = function (coords) {
  var newCoords = {};
  newCoords.x = (2 * coords.y + coords.x) / 2;
  newCoords.y = (2 * coords.y - coords.x) / 2;
  return newCoords;
};

HelperConstructor.prototype.twoDToIso = function (coords) {
  var newCoords = {};
  newCoords.x = coords.x - coords.y;
  newCoords.y = (coords.x + coords.y) / 2;
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

var helper = new HelperConstructor();

HTMLCanvasElement.prototype.relMouseCoords = function (event){
  var totalOffsetX = 0;
  var totalOffsetY = 0;
  var canvasX = 0;
  var canvasY = 0;
  var currentElement = this;

  do{
    totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
    totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
  }
  while(currentElement = currentElement.offsetParent)

  canvasX = event.pageX - totalOffsetX;
  canvasY = event.pageY - totalOffsetY;
  return {x:canvasX, y:canvasY}
};

Number.prototype.roundTo = function(num) {
  var resto = this % num;
  if (resto <= (num / 2)) {
    return this - resto;
  } else {
    return this + num - resto;
  }
};