var World = function(height, width) {
  var matrix;

  function init() {
    // Create an empty world map with empty objects
    var matrix = new Array(height);
    for (var i = 0; i < height; i++){
      matrix[i]= new Array(width);
      for (var j = 0; j < width; j++){
        matrix[i][j] = {
          open: true
        }
      }
    }
  }
  init();
  return matrix;
};

exports.World = World;



