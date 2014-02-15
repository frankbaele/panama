define(['eventmanager', 'sprite', 'underscore'], function (eventmanager, sprite) {
  var actorList = [];
  var CleanupList = [];
  var playerUuid = '';
  eventmanager.subscribe('actor.create', function(actor){
    actorList.push({
      uuid: actor.uuid,
      coordinates: actor.coordinates,
      sprite: actor.sprite
    });
  });
  eventmanager.subscribe('player.init', function(uuid){
    playerUuid = uuid;
  });

  eventmanager.subscribe('actor.update', function(actor){
    var oldActor = _.findWhere(actorList, {uuid: actor.uuid});
    CleanupList.push({coordinates: oldActor.coordinates});
    actorList = _.without(actorList, oldActor);
    actorList.push({
      uuid: actor.uuid,
      coordinates: actor.coordinates,
      sprite: actor.sprite
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

  var getPlayerUuid = function (){
    return playerUuid;
  };

  return {
    getCleanUpList : getCleanUpList,
    clearCleanUpList: clearCleanUpList,
    getActorList : getActorList,
    getPlayerUuid: getPlayerUuid
  };
});