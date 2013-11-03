/**************************************************
 ** GAME PLAYER CLASS
 **************************************************/
var Player = function (startGridPosition) {
  "use strict";
  var gridPosition = startGridPosition,
    goal = startGridPosition,
    diff = [],
    move = false,
    id,
    moveAmount = 3;
  

  var getGridPosition = function () {
    return gridPosition;
  };

  var setGridPosition = function (newGridPosition) {
    gridPosition = newGridPosition;
  };

  var setGoal = function (x, y) {
    var graph = new Graph(world.mapData);
    var start = graph.nodes[gridPosition.x][gridPosition.y];
    var end = graph.nodes[x][y];
    var result = astar.search(graph, start, end);
    console.log(result);
    move = true;
  };

  var getMove = function () {
    return move;
  };

  var update = function () {

  };

  var draw = function () {
    helper.drawSprite("player.png", gridPosition.x, gridPosition.y, "player");
  };

  return {
    getGridPosition : getGridPosition,
    setGridPosition : setGridPosition,
    getMove : getMove,
    update : update,
    draw : draw,
    setGoal : setGoal,
    move : move
  };
};