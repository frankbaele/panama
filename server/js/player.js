var Player = function(startGridPosition) {
  var gridPosition = startGridPosition,
    id;

  var getGridPosition = function () {
    return gridPosition;
  };

  var setGridPosition = function (newGridPosition) {
    gridPosition = newGridPosition;
  };

  return {
    getGridPosition : getGridPosition,
    setGridPostion : setGridPosition,
    id: id
  };
};

exports.Player = Player;
