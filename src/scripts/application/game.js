define(['actor.unit.human.local', 'actor.unit.ai.enemy','Assets', 'EventManager','Command', 'Animate', 'Input'], function (local, enemy, massets, eventManager) {

  function init() {
    gameCycle();
    var frank = new local;
    frank.create('player.png', {x:0, y:0});
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
