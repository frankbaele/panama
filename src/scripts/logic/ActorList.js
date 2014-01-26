define(['EventManager', 'Sprite', 'underscore'], function (eventManager, sprite) {
  var ActorList = [];
  var CleanupList = [];
  eventManager.subscribe('ActorCreate', function(actor){
    ActorList.push({
      uuid: actor.uuid,
      coordinates: actor.coordinates,
      sprite: actor.sprite
    });
  });

  eventManager.subscribe('ActorUpdate', function(actor){
    var oldActor = _.findWhere(ActorList, {uuid: actor.uuid});
    CleanupList.push({coordinates: oldActor.coordinates});
    ActorList = _.without(ActorList, oldActor);
    ActorList.push({
      uuid: actor.uuid,
      coordinates: actor.coordinates,
      sprite: actor.sprite
    });
  });

  eventManager.subscribe('ActorDelete', function(uuid){
    // delete the give Actor from the list
    var Actor = _.findWhere(ActorList, {uuid: uuid});
    CleanupList.push({coordinates: Actor.coordinates});
    ActorList = _.without(ActorList, Actor);
  });
  
  var getActorList = function (){
    return ActorList;
  }
  var getCleanUpList = function (){
    return CleanupList;
  }
  var clearCleanUpList = function (){
    CleanupList = [];
  }
  return {
    getCleanUpList : getCleanUpList,
    clearCleanUpList: clearCleanUpList,
    getActorList : getActorList
  };
});