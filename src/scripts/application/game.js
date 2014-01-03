define(['Assets', 'EventManager', 'Player', 'Animate', 'Input'], function (assets, eventManager, player) {

  function init() {
    gameCycle();
    var frank = new player();
    frank.create('player.png', {x:0,y:0});
  }

  function gameCycle() {
    // Call next cycle.
    setTimeout(gameCycle, 200);
    // Execute the previous cycle Commands.
    eventManager.publish('newGameCycle');
    // Generate commands to executed next cycle.
    //cycle++;
  }
  eventManager.subscribe('assetsLoaded', function(){init();});
});
