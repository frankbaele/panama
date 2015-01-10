define(['commandQueue', 'eventmanager'], function (commandQueue, eventmanager) {
  eventmanager.subscribe('command', function(e){
    newcommand(e);
  });
  eventmanager.subscribe('new.gamecycle', function(){executeQueue();});
  function newcommand(command){
    commandQueue.add(command);
  }

  function executeQueue(){
    var list = commandQueue.get();
    _.forEach(list, function(command){
      eventmanager.publish(command.event, command.parameters);
    });
    commandQueue.clear();
  }
});
