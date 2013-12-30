define(['Canvas'], function (canvas) {
  var mouseCallback = function (e){
    console.log('The mouse is not assigned, define mouseCallback');
  };
  // This snippet gives back some nice canvas relative coordinates
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

  canvas.player.canvas.addEventListener("click", function(e){
    mouseCallback(
      canvas.player.canvas.relMouseCoords(e));
    },
    false
  );


  function setMouseCallback(newCallback) {
    mouseCallback = newCallback;
  }

  return {
    setMouseCallback: setMouseCallback
  };
});