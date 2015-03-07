define(['eventmanager'], function (eventmanager) {
  var actorList = [];
  var cleanupList = [];

  eventmanager.subscribe('actor.create', function(actor){
    actorList.push(actor);
  });
  eventmanager.subscribe('actor.update', function(actor){
    var oldActor = _.findWhere(actorList, {uuid: actor.variables.uuid});
    _.merge(oldActor, actor);
  });

  eventmanager.subscribe('actor.delete', function(uuid){
    // delete the give Actor from the list
    var actor = _.findWhere(actorList, {uuid: uuid});
    cleanupList.push(actor.variables.uuid);
    actorList = _.without(actorList, actor);
  });

  var getActorList = function (){
    return actorList;
  };

  var getCleanUpList = function (){
    return cleanupList;
  };

  var clearCleanUpList = function (){
    cleanupList = [];
  };

  return {
    getCleanUpList : getCleanUpList,
    clearCleanUpList: clearCleanUpList,
    getActorList : getActorList
  };
});