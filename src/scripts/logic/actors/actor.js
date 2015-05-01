define(['eventmanager', 'standardlib'], function (eventmanager, stl) {
    return function (spec) {
        var that = {};
        that.uuid = stl.guid();
        that.variables = {
            coordinates: {
                current: spec.coordinates,
                previous: _.cloneDeep(spec.coordinates),
                next: _.cloneDeep(spec.coordinates)
            },
            collision: {
                width: 1,
                height: 1
            },
            tile:{
                width: app.config.terrain.tile.width,
                height: app.config.terrain.tile.height
            },
            direction: 'down',
            hp: 0,
            rendered: false,
            canvas: {}
        };

        that.init = function () {
            // register all the event handlers
            _.each(that.handlers, function (handlers, type) {
                _.each(handlers, function (handler, event_type) {
                    eventmanager[type](event_type, that[handler]);
                });
            });
            var carthCoords = stl.isoWorldPosToCarWorldPos(that.variables.coordinates.current);
            eventmanager.publish('actor.create', that.getInfo());
        };

        that.handlers = {
            'subscribe': {
                'actor.selected': 'actorSelect'
            }
        };

        that.actorSelect = function (uuid) {
            if (that.uuid == uuid) {
                that.variables.selected = true;
            } else {
                that.variables.selected = false;
            }
        };


        that.getInfo = function () {
            return that;
        };
        that.destroy = function () {
            eventmanager.publish('actor.delete', that.uuid);
        };
        return that;
    };
});