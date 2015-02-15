define(['eventmanager', 'actorList', 'standardlib', 'world'], function (eventmanager, actorList, standardlib, world) {
    return function (spec) {
        var that = {};

        that.init = function () {
            // register all the event handlers
            _.each(that.handlers, function (handlers, type) {
                _.each(handlers, function (handler, event_type) {
                    eventmanager[type](event_type, that[handler]);
                });
            });
            eventmanager.publish('actor.create', that.getInfo());
        };


        that.variables = {
            coordinates: spec.coordinates,
            width: world.tileWidth,
            height: world.tileHeight,
            uuid: standardlib.guid(),
            direction: 'down',
            hp: 0
        };

        that.handlers = {
            'subscribe': {
                'actor.selected': 'actorSelect'
            }
        };

        that.actorSelect = function (uuid) {
            if(that.variables.uuid == uuid){
                that.variables.selected = true;
            } else {
                that.variables.selected = false;
            }
        };


        that.getInfo = function () {
            return that;
        }
        that.destroy = function () {
            eventmanager.publish('actor.delete', variables.uuid);
        };
        return that;
    };
});