define([], function () {

  var GraphNodeType = {
    OPEN: 0,
    WALL: 1
  };

  function GraphNode(x,y,type) {
    this.data = { };
    this.x = x;
    this.y = y;
    this.pos = {
      x: x,
      y: y
    };
    this.type = type;
  }

  GraphNode.prototype.toString = function() {
    return "[" + this.x + " " + this.y + "]";
  };

  GraphNode.prototype.isWall = function() {
    return this.type == GraphNodeType.WALL;
  };

  return GraphNode
});