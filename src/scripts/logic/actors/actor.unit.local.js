define(['actor.unit', 'eventmanager'], function (unit, eventmanager) {
  return function (spec) {
    var that = unit(spec);
    var stats = {
      focus : '',
      sprite :{
        base: {
          up: [
            'Plane_T_Large_face0_0.png',
            'Plane_T_Large_face0_1.png',
            'Plane_T_Large_face0_2.png',
            'Plane_T_Large_face0_3.png',
          ],
          up_right: [
            'Plane_T_Large_face0_0.png',
            'Plane_T_Large_face0_1.png',
            'Plane_T_Large_face0_2.png',
            'Plane_T_Large_face0_3.png',
          ],
          right: [
            'Plane_T_Large_face0_0.png',
            'Plane_T_Large_face0_1.png',
            'Plane_T_Large_face0_2.png',
            'Plane_T_Large_face0_3.png',
          ],
          down_right: [
            'Plane_T_Large_face0_0.png',
            'Plane_T_Large_face0_1.png',
            'Plane_T_Large_face0_2.png',
            'Plane_T_Large_face0_3.png',
          ],
          down: [
            'Plane_T_Large_face0_0.png',
            'Plane_T_Large_face0_1.png',
            'Plane_T_Large_face0_2.png',
            'Plane_T_Large_face0_3.png',
          ],
          down_left: [
            'Plane_T_Large_face0_0.png',
            'Plane_T_Large_face0_1.png',
            'Plane_T_Large_face0_2.png',
            'Plane_T_Large_face0_3.png',
          ],
          left: [
            'Plane_T_Large_face0_0.png',
            'Plane_T_Large_face0_1.png',
            'Plane_T_Large_face0_2.png',
            'Plane_T_Large_face0_3.png',
          ],
          up_left: [
            'Plane_T_Large_face0_0.png',
            'Plane_T_Large_face0_1.png',
            'Plane_T_Large_face0_2.png',
            'Plane_T_Large_face0_3.png',
          ]
        }
      }
    }
    _.extend(that.variables, stats);

    var subscribe = {
      'map.click': 'checkMapClick'
    };

    _.extend(that.handlers.subscribe, subscribe);

    that.checkMapClick = function(e) {
      if(that.selected){
        that.variables.goal = e;
        that.generatePath();
      }
    };

    return that;
  }
});