define(['actor.unit.local', 'eventmanager'], function (unit, eventmanager) {
    return function (spec) {
        var that = unit(spec);
        var stats = {
            focus : '',
            state: 'base',
            direction: 0,
            sprite :{
                center: {
                    x: 24,
                    y: 20
                },
                height: 80,
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
                },
                explode: {
                    0: [
                        'plane/explode/color0_Plane_Large_face0_fiery_explode_0.png',
                        'plane/explode/color0_Plane_Large_face0_fiery_explode_1.png',
                        'plane/explode/color0_Plane_Large_face0_fiery_explode_2.png',
                        'plane/explode/color0_Plane_Large_face0_fiery_explode_3.png',
                        'plane/explode/color0_Plane_Large_face0_fiery_explode_4.png',
                        'plane/explode/color0_Plane_Large_face0_fiery_explode_5.png',
                        'plane/explode/color0_Plane_Large_face0_fiery_explode_6.png',
                        'plane/explode/color0_Plane_Large_face0_fiery_explode_7.png',
                        'plane/explode/color0_Plane_Large_face0_fiery_explode_8.png',
                        'plane/explode/color0_Plane_Large_face0_fiery_explode_9.png',
                        'plane/explode/color0_Plane_Large_face0_fiery_explode_10.png',
                        'plane/explode/color0_Plane_Large_face0_fiery_explode_11.png',
                    ],
                    1: [
                        'plane/explode/color0_Plane_Large_face1_fiery_explode_0.png',
                        'plane/explode/color0_Plane_Large_face1_fiery_explode_1.png',
                        'plane/explode/color0_Plane_Large_face1_fiery_explode_2.png',
                        'plane/explode/color0_Plane_Large_face1_fiery_explode_3.png',
                        'plane/explode/color0_Plane_Large_face1_fiery_explode_4.png',
                        'plane/explode/color0_Plane_Large_face1_fiery_explode_5.png',
                        'plane/explode/color0_Plane_Large_face1_fiery_explode_6.png',
                        'plane/explode/color0_Plane_Large_face1_fiery_explode_7.png',
                        'plane/explode/color0_Plane_Large_face1_fiery_explode_8.png',
                        'plane/explode/color0_Plane_Large_face1_fiery_explode_9.png',
                        'plane/explode/color0_Plane_Large_face1_fiery_explode_10.png',
                        'plane/explode/color0_Plane_Large_face1_fiery_explode_11.png',
                    ],
                    2: [
                        'plane/explode/color0_Plane_Large_face2_fiery_explode_0.png',
                        'plane/explode/color0_Plane_Large_face2_fiery_explode_1.png',
                        'plane/explode/color0_Plane_Large_face2_fiery_explode_2.png',
                        'plane/explode/color0_Plane_Large_face2_fiery_explode_3.png',
                        'plane/explode/color0_Plane_Large_face2_fiery_explode_4.png',
                        'plane/explode/color0_Plane_Large_face2_fiery_explode_5.png',
                        'plane/explode/color0_Plane_Large_face2_fiery_explode_6.png',
                        'plane/explode/color0_Plane_Large_face2_fiery_explode_7.png',
                        'plane/explode/color0_Plane_Large_face2_fiery_explode_8.png',
                        'plane/explode/color0_Plane_Large_face2_fiery_explode_9.png',
                        'plane/explode/color0_Plane_Large_face2_fiery_explode_10.png',
                        'plane/explode/color0_Plane_Large_face2_fiery_explode_11.png',
                    ],
                    3: [
                        'plane/explode/color0_Plane_Large_face3_fiery_explode_0.png',
                        'plane/explode/color0_Plane_Large_face3_fiery_explode_1.png',
                        'plane/explode/color0_Plane_Large_face3_fiery_explode_2.png',
                        'plane/explode/color0_Plane_Large_face3_fiery_explode_3.png',
                        'plane/explode/color0_Plane_Large_face3_fiery_explode_4.png',
                        'plane/explode/color0_Plane_Large_face3_fiery_explode_5.png',
                        'plane/explode/color0_Plane_Large_face3_fiery_explode_6.png',
                        'plane/explode/color0_Plane_Large_face3_fiery_explode_7.png',
                        'plane/explode/color0_Plane_Large_face3_fiery_explode_8.png',
                        'plane/explode/color0_Plane_Large_face3_fiery_explode_9.png',
                        'plane/explode/color0_Plane_Large_face3_fiery_explode_10.png',
                        'plane/explode/color0_Plane_Large_face3_fiery_explode_11.png',
                    ]
                }
            },
            health : 75,
            death : false,
            hp : 100,
            speed: 30
        };

        _.extend(that.variables, stats);
        return that;
    }
});