var World = function(height, width) {
  var matrix;

  function init() {
    generateWorld();
  }
  function generateWorld(){
    // Create an empty world map with empty objects
    matrix = new Array(height);
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

  return {
    matrix: matrix
  }
};

exports.World = World;



