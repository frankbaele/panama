define(['eventmanager', 'sprite', 'underscore'], function (eventmanager, sprite) {
  var actorList = [];
  var CleanupList = [];
  var playerUuid = '';
  eventmanager.subscribe('actor.create', function(actor){
    actorList.push({
      uuid: actor.variables.uuid,
      coordinates: actor.variables.coordinates,
      sprite: actor.variables.sprite
    });
  });
  eventmanager.subscribe('actor.update', function(actor){
    var oldActor = _.findWhere(actorList, {uuid: actor.variables.uuid});
    CleanupList.push({coordinates: oldActor.coordinates});
    actorList = _.without(actorList, oldActor);
    actorList.push({
      uuid: actor.variables.uuid,
      coordinates: actor.variables.coordinates,
      sprite: actor.variables.sprite
    });
  });

  eventmanager.subscribe('actor.delete', function(uuid){
    // delete the give Actor from the list
    var Actor = _.findWhere(actorList, {uuid: uuid});
    CleanupList.push({coordinates: Actor.coordinates});
    actorList = _.without(actorList, Actor);
  });

  var getActorList = function (){
    return actorList;
  };

  var getCleanUpList = function (){
    return CleanupList;
  };

  var clearCleanUpList = function (){
    CleanupList = [];
  };

  return {
    getCleanUpList : getCleanUpList,
    clearCleanUpList: clearCleanUpList,
    getActorList : getActorList
  };
});