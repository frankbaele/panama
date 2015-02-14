define(['actor.unit', 'eventmanager'], function (unit, eventmanager) {
  return function (spec) {
    var that = unit(spec);
    var stats = {
      focus : '',
      state: 'base',
      sprite :{
        base: {
          up: [
            'color0_Plane_Large_face0_attack_0_0.png',
            'color0_Plane_Large_face0_attack_0_1.png',
            'color0_Plane_Large_face0_attack_0_2.png',
            'color0_Plane_Large_face0_attack_0_3.png',
            'color0_Plane_Large_face0_attack_0_4.png',
            'color0_Plane_Large_face0_attack_0_5.png',
            'color0_Plane_Large_face0_attack_0_6.png',
            'color0_Plane_Large_face0_attack_0_7.png',
            'color0_Plane_Large_face0_attack_0_8.png',
            'color0_Plane_Large_face0_attack_0_9.png',
            'color0_Plane_Large_face0_attack_0_10.png',
            'color0_Plane_Large_face0_attack_0_11.png',
            'color0_Plane_Large_face0_attack_0_12.png',
            'color0_Plane_Large_face0_attack_0_13.png',
            'color0_Plane_Large_face0_attack_0_14.png',
            'color0_Plane_Large_face0_attack_0_15.png',
          ],
          up_right: [
            'color0_Plane_Large_face0_attack_0_0.png',
            'color0_Plane_Large_face0_attack_0_1.png',
            'color0_Plane_Large_face0_attack_0_2.png',
            'color0_Plane_Large_face0_attack_0_3.png',
            'color0_Plane_Large_face0_attack_0_4.png',
            'color0_Plane_Large_face0_attack_0_5.png',
            'color0_Plane_Large_face0_attack_0_6.png',
            'color0_Plane_Large_face0_attack_0_7.png',
            'color0_Plane_Large_face0_attack_0_8.png',
            'color0_Plane_Large_face0_attack_0_9.png',
            'color0_Plane_Large_face0_attack_0_10.png',
            'color0_Plane_Large_face0_attack_0_11.png',
            'color0_Plane_Large_face0_attack_0_12.png',
            'color0_Plane_Large_face0_attack_0_13.png',
            'color0_Plane_Large_face0_attack_0_14.png',
            'color0_Plane_Large_face0_attack_0_15.png',
          ],
          right: [
            'color0_Plane_Large_face0_attack_0_0.png',
            'color0_Plane_Large_face0_attack_0_1.png',
            'color0_Plane_Large_face0_attack_0_2.png',
            'color0_Plane_Large_face0_attack_0_3.png',
            'color0_Plane_Large_face0_attack_0_4.png',
            'color0_Plane_Large_face0_attack_0_5.png',
            'color0_Plane_Large_face0_attack_0_6.png',
            'color0_Plane_Large_face0_attack_0_7.png',
            'color0_Plane_Large_face0_attack_0_8.png',
            'color0_Plane_Large_face0_attack_0_9.png',
            'color0_Plane_Large_face0_attack_0_10.png',
            'color0_Plane_Large_face0_attack_0_11.png',
            'color0_Plane_Large_face0_attack_0_12.png',
            'color0_Plane_Large_face0_attack_0_13.png',
            'color0_Plane_Large_face0_attack_0_14.png',
            'color0_Plane_Large_face0_attack_0_15.png',
          ],
          down_right: [
            'color0_Plane_Large_face0_attack_0_0.png',
            'color0_Plane_Large_face0_attack_0_1.png',
            'color0_Plane_Large_face0_attack_0_2.png',
            'color0_Plane_Large_face0_attack_0_3.png',
          ],
          down: [
            'color0_Plane_Large_face0_attack_0_0.png',
            'color0_Plane_Large_face0_attack_0_1.png',
            'color0_Plane_Large_face0_attack_0_2.png',
            'color0_Plane_Large_face0_attack_0_3.png',
            'color0_Plane_Large_face0_attack_0_4.png',
            'color0_Plane_Large_face0_attack_0_5.png',
            'color0_Plane_Large_face0_attack_0_6.png',
            'color0_Plane_Large_face0_attack_0_7.png',
            'color0_Plane_Large_face0_attack_0_8.png',
            'color0_Plane_Large_face0_attack_0_9.png',
            'color0_Plane_Large_face0_attack_0_10.png',
            'color0_Plane_Large_face0_attack_0_11.png',
            'color0_Plane_Large_face0_attack_0_12.png',
            'color0_Plane_Large_face0_attack_0_13.png',
            'color0_Plane_Large_face0_attack_0_14.png',
            'color0_Plane_Large_face0_attack_0_15.png',
          ],
          down_left: [
            'color0_Plane_Large_face0_attack_0_0.png',
            'color0_Plane_Large_face0_attack_0_1.png',
            'color0_Plane_Large_face0_attack_0_2.png',
            'color0_Plane_Large_face0_attack_0_3.png',
          ],
          left: [
            'color0_Plane_Large_face0_attack_0_0.png',
            'color0_Plane_Large_face0_attack_0_1.png',
            'color0_Plane_Large_face0_attack_0_2.png',
            'color0_Plane_Large_face0_attack_0_3.png',
          ],
          up_left: [
            'color0_Plane_Large_face0_attack_0_0.png',
            'color0_Plane_Large_face0_attack_0_1.png',
            'color0_Plane_Large_face0_attack_0_2.png',
            'color0_Plane_Large_face0_attack_0_3.png',
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