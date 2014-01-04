define(['actor.unit.human.local', 'actor.unit.ai.enemy','Assets', 'EventManager','Command', 'Animate', 'Input'], function (local, enemy, massets, eventManager) {

  function init() {
    frank = new local;
    frank.create('player.png', {x:0, y:0});
    ruben = new enemy;
    ruben.create('ally.png', {x:0, y:5});
    gameCycle();
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
