var SpriteSheet = function (confConstructor, fileConstructor){
  "use strict";
  var
    img = null,
    sprites = [],
    configuration = confConstructor,
    file = fileConstructor;
  var init = function (){
    console.log(configuration);
  };

  var defSprite = function (name, x, y, w, h, cx, cy) {
    var spt = {
      "id": name,
      "x": x,
      "y": y,
      "w": w,
      "h": h,
      "cx": cx === null ? 0 : cx,
      "cy": cy === null ? 0 : cy
    };
    sprites.push(spt);
  };

  init();
  return {

  };
};