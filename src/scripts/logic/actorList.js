define(['eventmanager', 'underscore'], function (eventmanager, sprite) {
  var actorList = [];
  var cleanupList = [];

  eventmanager.subscribe('actor.create', function(actor){
    actorList.push({
      uuid: actor.variables.uuid,
      coordinates: actor.variables.coordinates,
      sprite: actor.variables.sprite,
      width: actor.variables.width,
      height: actor.variables.height,
      direction: actor.variables.direction,
      state: actor.variables.state,
      canvas: {},
      rendered: false
    });
  });
  eventmanager.subscribe('actor.update', function(actor){
    var oldActor = _.findWhere(actorList, {uuid: actor.variables.uuid});
    actorList = _.without(actorList, oldActor);
    console.log(oldActor.rendered);
    actorList.push({
      uuid: actor.variables.uuid,
      coordinates: actor.variables.coordinates,
      sprite: actor.variables.sprite,
      rendered: oldActor.rendered,
      canvas: oldActor.canvas,
      direction: actor.variables.direction,
      state: actor.variables.state,
      spriteIndex: 0
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