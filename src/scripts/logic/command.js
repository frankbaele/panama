define(['CommandQueue', 'EventManager'], function (commandQueue, eventManager) {
  eventManager.subscribe('command', function(e){
    newCommand(e);
  });
  eventManager.subscribe('new.gamecycle', function(){executeQueue();});
  function newCommand(command){
    commandQueue.add(command);
  }

  function executeQueue(){
    var list = commandQueue.get();
    _.forEach(list, function(command){
      eventManager.publish(command.event, command.parameters);
    });
    commandQueue.clear();
  }
});