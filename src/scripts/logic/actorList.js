define(['eventmanager', 'underscore'], function (eventmanager, sprite) {
  var actorList = [];
  var cleanupList = [];

  eventmanager.subscribe('actor.create', function(actor){
    actorList.push({
      uuid: actor.variables.uuid,
      coordinates: actor.variables.coordinates,
      sprite: actor.variables.sprite,
      rendered: false
    });

  });
  eventmanager.subscribe('actor.update', function(actor){
    var oldActor = _.findWhere(actorList, {uuid: actor.variables.uuid});
    actorList = _.without(actorList, oldActor);
    actorList.push({
      uuid: actor.variables.uuid,
      coordinates: actor.variables.coordinates,
      sprite: actor.variables.sprite,
      rendered: oldActor.rendered
    });
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