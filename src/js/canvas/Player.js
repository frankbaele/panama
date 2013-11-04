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
    var start = world.graph.nodes[gridPosition.y][gridPosition.x];
    var end = world.graph.nodes[y][x];
    var results = astar.search(world.graph.nodes, start, end);
    _.forEach(results, function(result){
      console.log(result.x, result.y);
      helper.drawSprite("ally.png", result.y, result.x,"player");
    });
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