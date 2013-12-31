define(['Assets', 'EventManager', 'Actor', 'Animate', 'Input'], function (assets, eventManager, actor) {
  function init() {
    gameCycle();
    player = actor;
    player.create('player.png', {x:0,y:0})
  }

  function gameCycle() {
    // Call next cycle.
    setTimeout(gameCycle, 200);
    // Execute the previous cycle Commands.
    excuteCycle();
    // Generate commands to executed next cycle.
    //cycle++;
  }
  function excuteCycle(){

  }
  eventManager.subscribe('assetsLoaded', function(){init();});
});
