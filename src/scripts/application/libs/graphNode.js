define([], function () {

  var graphNodeType = {
    OPEN: 0,
    WALL: 1
  };

  function graphNode(x,y,type) {
    this.data = { };
    this.x = x;
    this.y = y;
    this.pos = {
      x: x,
      y: y
    };
    this.type = type;
  }

  graphNode.prototype.toString = function() {
    return "[" + this.x + " " + this.y + "]";
  };

  graphNode.prototype.isWall = function() {
    return this.type == graphNodeType.WALL;
  };

  return graphNode
});