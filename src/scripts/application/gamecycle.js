define(['EventManager','Command'], function (eventManager) {

  function init() {
    gameCycle();
  }

  function gameCycle() {
    // Call next cycle.
    setTimeout(gameCycle, 200);
    // Execute the previous cycle Commands.
    eventManager.publish('new.gamecycle');
    // Generate commands to executed next cycle.
    //cycle++;
  }

  eventManager.subscribe('game.init', function(){init();});
});
