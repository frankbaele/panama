define([ 'plane', 'assets', 'eventmanager', 'gamecycle', 'animate', 'input'], function (plane, assets, eventmanager) {
    assets.load(function(){
        setTimeout(function(){eventmanager.publish('game.init');}, 250);

    })
    plane({coordinates : {x:30, y:30}}).init();
    plane({coordinates : {x:29, y:30}}).init();
    plane({coordinates : {x:31, y:30}}).init();
    plane({coordinates : {x:30, y:29}}).init();
    plane({coordinates : {x:30, y:31}}).init();
    plane({coordinates : {x:33, y:30}}).init();
    plane({coordinates : {x:29, y:31}}).init();
    plane({coordinates : {x:31, y:31}}).init();
    plane({coordinates : {x:30, y:28}}).init();

});