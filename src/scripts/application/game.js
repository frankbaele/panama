define(['actor.unit.human.local', 'actor.unit.ai.enemy','Assets', 'EventManager','Command', 'Animate', 'Input'], function (local, enemy, massets, eventManager) {

  function init() {
    gameCycle();
    game.frank = new local('player.png', {x: 5, y:5});
    game.ruben = new enemy('ally.png', {x: 10, y:10});
  }

  function gameCycle() {
    // Call next cycle.
    setTimeout(gameCycle, 200);
    // Execute the previous cycle Commands.
    eventManager.publish('new.gamecycle');
    // Generate commands to executed next cycle.
    //cycle++;
  }

  eventManager.subscribe('assets.loaded', function(){init();});
});
