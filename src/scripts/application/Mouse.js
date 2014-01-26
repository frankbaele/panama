define(['Canvas', 'STL'], function (canvas, stl) {
  var leftMouseCallback = function (e){
    console.log('The right mouse click is not assigned, define leftMouseCallback');
  };
  var rightMouseCallback = function (e){
    console.log('The left mouse click is not assigned, define rightMouseCallback');
  };

  // This snippet gives back some nice canvas relative coordinates
  HTMLCanvasElement.prototype.relMouseCoordinates = function (event) {
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

  window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  canvas.player.canvas.addEventListener("click", function(e){
      var coordinates = canvas.player.canvas.relMouseCoordinates(e);
      coordinates = stl.worldPosToGridPos(coordinates.x, coordinates.y, canvas.player.canvas.width);
      leftMouseCallback(coordinates);
    },
    false
  );

  canvas.player.canvas.addEventListener("contextmenu", function(e){
    var coordinates = canvas.player.canvas.relMouseCoordinates(e);
    coordinates = stl.worldPosToGridPos(coordinates.x, coordinates.y, canvas.player.canvas.width);
    rightMouseCallback(coordinates);
    },
    false
  );


  function setLeftMouseCallback(newCallback) {
    leftMouseCallback = newCallback;
  }

  function setRightMouseCallback(newCallback) {
    rightMouseCallback = newCallback;
  }

  return {
    setLeftMouseCallback: setLeftMouseCallback,
    setRightMouseCallback: setRightMouseCallback
  };
});