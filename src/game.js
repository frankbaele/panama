//load the AMD modules we need
require([
  'frozen/GameCore',
  'dojo/keys',
], function(GameCore, keys){

  'use strict';

  // game state
  var x = 0;
  var y = 0;
  var speed = 2.5;
  //setup a GameCore instance
  var body = document.getElementById('bodyWrapper');
  var gameArea = document.createElement('canvas');

  gameArea.width = window.innerWidth - 40;
  gameArea.height = window.innerHeight - 50;
  gameArea.setAttribute('id', 'gameArea');

  body.appendChild(gameArea);
  var game = new GameCore({
    canvasId: 'gameArea',
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

    update: function(millis){

    },
    draw: function(context){
      context.clearRect(0, 0, this.width, this.height);
      context.fillRect(x, y, 50, 50);
    }
  });

  //launch the game!
  game.run();
});