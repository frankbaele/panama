//load the AMD modules we need
require([
  'frozen/GameCore',
  'dojo/keys',
  'rot'
], function(GameCore, keys){

  'use strict';

  // game state
  var x = 0;
  var y = 0;
  var speed = 2.5;
  //setup a GameCore instance
  var map = new ROT.Map.Digger(100, 100);
  map.create();
  console.log(map);
  var rooms = map.getRooms();
  var corridors = map.getCorridors();
  var game = new GameCore({
    canvasId: 'gameArea',
    gameAreaId: 'bodyWrapper',
    width: 500,
    height: 500,
    initInput: function(im){ // im = this.inputManager

      //tells the input manager to listen for key events
      im.addKeyAction(keys.LEFT_ARROW);
      im.addKeyAction(keys.RIGHT_ARROW);
      im.addKeyAction(keys.UP_ARROW);
      im.addKeyAction(keys.DOWN_ARROW);

    },
    handleInput: function(im){

      //just an example showing how to check for presses, could be done more effeciently

      if(im.keyActions[keys.LEFT_ARROW].isPressed()){
        x-= speed;
      }

      if(im.keyActions[keys.RIGHT_ARROW].isPressed()){
        x+= speed;
      }

      if(im.keyActions[keys.UP_ARROW].isPressed()){
        y-= speed;
      }

      if(im.keyActions[keys.DOWN_ARROW].isPressed()){
        y+= speed;
      }
    },
    draw: function(context){
      for (var i=0; i<rooms.length; i++){
        var room = rooms[i];
        var x = room._x1;
        var y = room._y1;
        // make the correction to avoid 0 height or width
        var width = room._x2 - x + 1;
        var height = room._y2 - y + 1 ;
        context.fillRect(x*5, y*5, width*5, height*5);
      }

      for (var i=0; i<corridors.length; i++){
        var corridor = corridors[i];
        var x = corridor._startX;
        var y = corridor._startY;
        // make the correction to avoid 0 height or width
        var width = corridor._endX - x + 1;
        var height = corridor._endY - y + 1 ;
        context.fillStyle="#FF0000";
        context.fillRect(x*5, y*5, width*5, height*5);
      }

    }
  });

  //launch the game!
  game.run();
});

