define([
        'eventmanager',
        'standardlib',
        'actorList',
        'center',
        'assetLoader',
        'rvo',
        'collisionGrid'],
    function (eventmanager, stl, actorList, center, assetLoader, RVO, collisionGrid) {
        var healthbarHeight = 7.5;

        function update(delta) {
            var actors = actorList.getActorList();
            _.each(actorList.getCleanUpList(), function (actor) {
                $(app.config.element).find('canvas.' + actor.uuid).remove();
            });
            actorList.clearCleanUpList();
            _.each(actors, function (actor) {
                var agent =  collisionGrid.simulator.agents[actor.agent];

                if(actor.variables.coordinates.next !== null){
                    var goal = actor.variables.coordinates.next;
                    var goalVector = RVO.Vector.subtract([goal.x, goal.y], agent.position);
                    if (RVO.Vector.absSq(goalVector) > 1) {
                        goalVector = RVO.Vector.normalize(goalVector);
                    }
                } else {
                    goalVector = [0,0]
                }

                agent.prefVelocity = goalVector;

                actor.variables.coordinates.current = {
                    x : agent.position[0],
                    y : agent.position[1]
                };
                // Check if the actor is inbound, so we can clean up or create the canvas for the actor
                if (actorInbound(actor.variables.coordinates.current)) {
                    if (!actor.variables.rendered) {
                        app.config.element.ActorsWrapper
                            .insertAdjacentHTML('beforeend', '<canvas id="' + actor.uuid + '"></canvas>');

                        actor.variables.canvas = $(app.config.element.ActorsWrapper).find("#" +  actor.uuid)[0];
                        actor.variables.canvas.context = actor.variables.canvas.getContext("2d");
                        actor.variables.canvas.addEventListener("click", function () {
                                eventmanager.publish('actor.selected', actor.uuid);
                            }
                        );
                        actor.variables.rendered = true;

                    }

                    updateActorDirection(actor);
                    updateActorPosition(actor);
                    updateActorSprite(actor);

                } else {
                    if (actor.variables.rendered) {
                        $(actor.variables.canvas).remove();
                        actor.variables.rendered = false;
                        actor.variables.canvas = '';
                    }
                    updateActorPosition(actor);
                }
            });
            collisionGrid.simulator.doStep();
        }
        function updateActorDirection(actor) {
            var agent =  collisionGrid.simulator.agents[actor.agent];
            if(agent.velocity[1] != 0 || agent.velocity[0] != 0){

                var rad = Math.atan2(agent.velocity[1], agent.velocity[0]);
                if(rad <= - Math.PI/2 && rad >= - Math.PI){
                    actor.variables.direction = 2;
                }
                else if(rad > - Math.PI/2 && rad <= 0){
                    actor.variables.direction = 3;
                }
                else if(rad > 0 && rad <= Math.PI/2){
                    actor.variables.direction = 0;
                } else{
                    actor.variables.direction = 1;
                }
            }
        }

        function updateActorPosition(actor) {
            var width = window.innerWidth;
            var height = window.innerHeight;
            var current = actor.variables.coordinates.current;
            actor.variables.coordinates.previous = _.cloneDeep(current);
            var y = current.y - (center.y * app.config.actor.tile.height);
            var bottom = (height / 2 - y);
            var left = (current.x - (app.config.actor.tile.width * app.config.actor.grid.width / 2) - actor.variables.sprite.width / 2) - (center.x * app.config.actor.tile.width - width / 2);

            $(actor.variables.canvas)
                .css('z-index', Math.floor(actor.variables.coordinates.current.y / app.config.actor.tile.height))
                .css('bottom', bottom)
                .css('left', left);
            actor.variables.stuck = false;
        }

        function updateActorSprite(actor) {
            actor.variables.canvas.context.clearRect(0, 0, actor.variables.canvas.width, actor.variables.canvas.height);
            if (typeof actor.variables.sprite[actor.variables.state][actor.variables.direction][actor.variables.spriteIndex] === 'undefined') {
                actor.variables.spriteIndex = 0;
            }
            drawActor(actor);
            if (actor.variables.selected) {
                drawHealthBar(actor);
            }
            actor.variables.spriteIndex++;
        }

        function actorInbound(config) {
            var coordinates = stl.worldPosToIsoPos({x: config.x, y: config.y});
            var isoCenter = center;
            var width = Math.ceil(window.innerWidth / (app.config.actor.tile.width));
            var height = Math.ceil(window.innerHeight / (app.config.actor.tile.height));
            if ((coordinates.x >= (isoCenter.x - width / 2)) && coordinates.x <= (isoCenter.x + width / 2)) {
                if ((coordinates.y >= (isoCenter.y - height / 2)) && coordinates.y <= (isoCenter.y + height / 2)) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }

        function drawActor(actor) {

            // For lop trough all the atlasses with find, because we want to exit this loop when the atlas is found.
            var spt,
                img;

            // For lop trough all the atlasses with find, because we want to exit this loop when the atlas is found.
            _.findIndex(assetLoader.assets.loaded.atlas, function (sheet) {
                // Search for a sprite with the same sprite name
                var temp = _.findWhere(sheet.sprite.sprites, {id: actor.variables.sprite[actor.variables.state][actor.variables.direction][actor.variables.spriteIndex]});
                // exit find loop when sprite is found.
                if (!_.isEmpty(temp)) {
                    spt = temp;
                    img = sheet.sprite.img;
                }
            });
            if (_.isEmpty(spt)) {
                return;
            }

            actor.variables.canvas.width = actor.variables.sprite.width;
            actor.variables.canvas.height = actor.variables.sprite.height + healthbarHeight;

            var x = 0;
            var y = actor.variables.canvas.height - spt.h;
            actor.variables.canvas.context.drawImage(
                img,
                spt.x, spt.y,
                spt.w, spt.h,
                x,
                y,
                spt.w,
                spt.h);
        }

        function drawHealthBar(actor) {
            actor.variables.canvas.context.fillStyle = 'red';
            actor.variables.canvas.context.fillRect((actor.variables.canvas.width - 40) / 2, 0, 38, healthbarHeight - 2);
            actor.variables.canvas.context.fillStyle = 'green';
            var health = actor.variables.health / actor.variables.hp;
            actor.variables.canvas.context.fillRect((actor.variables.canvas.width - 40) / 2, 0, (38) * health, healthbarHeight - 2);
        }

        function applySelection(selection) {
            // Remove all previous selections.
            var xCorrection = window.innerWidth / 2;
            var yCorrection = window.innerHeight / 2;
            var coordinatesWindow = {};
            coordinatesWindow.x = -((center.x) * app.config.actor.tile.width + ((app.config.actor.grid.width * app.config.actor.tile.width) / 2) - xCorrection);
            coordinatesWindow.y = -(((center.y) * app.config.actor.tile.height)) + yCorrection;
            var left = -coordinatesWindow.x + selection.left;
            var top = -coordinatesWindow.y + selection.top;
            var topLeft = stl.worldPosToIsoPos({x: left, y: top});
            var bottomRight = stl.worldPosToIsoPos({x: left + selection.width, y: top + selection.height});
            _.each(actorList.getActorList(), function (actor) {
                var coordinates = stl.worldPosToIsoPos({
                    x: actor.variables.coordinates.current.x,
                    y: actor.variables.coordinates.current.y
                });
                if ((coordinates.x >= topLeft.x) && coordinates.x <= bottomRight.x) {
                    if ((coordinates.y >= topLeft.y) && coordinates.y <= bottomRight.y) {

                        actor.variables.selected = true;
                    }
                    else {
                        actor.variables.selected = false;
                    }
                }
                else {
                    actor.variables.selected = false;
                }
            });
        }

        eventmanager.subscribe('new.frame', function (delta) {
            update(delta);
        });
        eventmanager.subscribe('center.update.start', function () {
            $(app.config.element).find('.ActorsWrapper').removeClass('no-panning');
        });
        eventmanager.subscribe('center.update.stop', function () {
            $(app.config.element).find('.ActorsWrapper').addClass('no-panning');
        });
        eventmanager.subscribe('map.selection', function (selection) {
            applySelection(selection);
        })
    });
