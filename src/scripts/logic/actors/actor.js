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
                'mouse.click.left': 'checkLeftClick',
                'actor.selected': 'checkFocus'
            }
        };

        that.checkLeftClick = function (e) {
            if (e.x == that.variables.coordinates.x && e.y == that.variables.coordinates.y) {
                that.variables.selected = true;
                eventmanager.publish('actor.selected', that.variables.uuid);
            } else if (that.variables.selected) {
                that.variables.selected = false;
                eventmanager.publish('actor.unselected', that.variables.uuid);
            }
        };

        that.checkFocus = function (uuid) {

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