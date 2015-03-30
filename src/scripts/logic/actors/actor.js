define(['eventmanager', 'standardlib', 'collisionGrid'], function (eventmanager, stl, collisionGrid) {
    return function (spec) {
        var that = {};
        that.variables = {
            coordinates: {
                current: spec.coordinates,
                previous: _.cloneDeep(spec.coordinates),
                next: _.cloneDeep(spec.coordinates)
            },
            collision: {
                width: 2,
                height: 2
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
            var config = {
                too: stl.worldPosToGridPos(spec.coordinates),
                height: that.variables.collision.height,
                width: that.variables.collision.width,
                success: function () {
                    // register all the event handlers
                    _.each(that.handlers, function (handlers, type) {
                        _.each(handlers, function (handler, event_type) {
                            eventmanager[type](event_type, that[handler]);
                        });
                    });
                    eventmanager.publish('actor.create', that.getInfo());
                },
                failure: function () {
                    // Creation failed coordinates are blocked.
                }
            };
            collisionGrid.update(config);
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