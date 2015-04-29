define(['eventmanager', 'standardlib', 'steer'], function (eventmanager, stl, steer) {
    return function (spec) {
        var that = {};
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
            uuid: stl.guid(),
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
            that.variables.steer = steer.item.Creator.createUnit({
                x: carthCoords.x,
                y: carthCoords.y,
                radius: 10,
                maxForce: 2,
                maxSpeed: 10,
                dynamic: true,
                canCollide: true
            });
            eventmanager.publish('actor.create', that.getInfo());
        };

        that.handlers = {
            'subscribe': {
                'actor.selected': 'actorSelect'
            }
        };

        that.actorSelect = function (uuid) {
            if (that.variables.uuid == uuid) {
                that.variables.selected = true;
            } else {
                that.variables.selected = false;
            }
        };


        that.getInfo = function () {
            return that;
        };
        that.destroy = function () {
            eventmanager.publish('actor.delete', variables.uuid);
        };
        return that;
    };
});