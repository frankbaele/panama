define(['actor.unit.human.local', 'actor.unit.ai.enemy','Assets', 'EventManager','Command', 'Animate', 'Input'], function (local, enemy, massets, eventManager) {

  function init() {
    gameCycle();
    var frank = new local('player.png', {x: 5, y:5});
    console.log(frank);
    var frank = new enemy('player.png', {x: 5, y:5});
    console.log(frank);
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
