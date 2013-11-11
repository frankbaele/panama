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
    var results = astar.search(world.graph.nodes, start, end, true);

    _.forEach(results, function(result){
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

  function generateNewLocalPlayer() {
    helper.generateStartPosition(function (startGridPosition) {

      // Initialise the local player
      mapCenter = helper.clone(startGridPosition);
      console.log('new');
      localPlayer = new Player(startGridPosition);
      // So when the new player object is created, start animating it.
      animate();
      gameCycle();
    });
  }

  function drawPlayers() {
    playerCtx.clearRect(0, 0, playerCanvas.width, playerCanvas.height);
    localPlayer.draw();
    redrawPlayers = false;
  }

  function playerById(id) {
    var i;
    for (i = 0; i < remotePlayers.length; i++) {
      if (remotePlayers[i].id == id)
        return remotePlayers[i];
    }
    return false;
  }

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