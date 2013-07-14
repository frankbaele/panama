
/**************************************************
 ** HELPER FUNCTIONS
 **************************************************/
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
  var resto = this%num;
  if (resto <= (num/2)) {
    return this-resto;
  } else {
    return this+num-resto;
  }
}