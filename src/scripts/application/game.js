define(['actor.unit.human.local', 'Assets', 'EventManager','Command', 'Animate', 'Input'], function (local, massets, eventManager) {

  function init() {
    frank = new local;
    frank.create('player.png', {x:0, y:0});
    gameCycle();
  }

  function gameCycle() {
    // Call next cycle.
    setTimeout(gameCycle, 50);
    // Execute the previous cycle Commands.
    eventManager.publish('newGameCycle');
    // Generate commands to executed next cycle.
    //cycle++;
  }
  eventManager.subscribe('assetsLoaded', function(){init();});
});
