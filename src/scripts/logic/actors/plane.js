define(['actor.unit', 'eventmanager'], function (unit, eventmanager) {
    return function (spec) {
        var that = unit(spec);
        var stats = {
            focus : '',
            state: 'base',
            direction: 3,
            sprite :{
                center: {
                    x: 24,
                    y: 20
                },
                base: {
                    0: [
                        'plane/base/Plane_Large_face0_0.png',
                        'plane/base/Plane_Large_face0_1.png',
                        'plane/base/Plane_Large_face0_2.png',
                        'plane/base/Plane_Large_face0_3.png',
                    ],
                    1: [
                        'plane/base/Plane_Large_face1_0.png',
                        'plane/base/Plane_Large_face1_1.png',
                        'plane/base/Plane_Large_face1_2.png',
                        'plane/base/Plane_Large_face1_3.png',
                    ],
                    2: [
                        'plane/base/Plane_Large_face2_0.png',
                        'plane/base/Plane_Large_face2_1.png',
                        'plane/base/Plane_Large_face2_2.png',
                        'plane/base/Plane_Large_face2_3.png',
                    ],
                    3: [
                        'plane/base/Plane_Large_face3_0.png',
                        'plane/base/Plane_Large_face3_1.png',
                        'plane/base/Plane_Large_face3_2.png',
                        'plane/base/Plane_Large_face3_3.png',
                    ]
                }
            }
        };

        _.extend(that.variables, stats);
        function changeDirection(actor){
            setTimeout(function(){
                if(actor.variables.direction <= 2){
                    actor.variables.direction++;
                }
                else{
                    actor.variables.direction = 0;
                }
                changeDirection(actor);
                eventmanager.publish('actor.update', that.getInfo());
            }, 2000)
        }
        changeDirection(that);
        return that;
    }
});