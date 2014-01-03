define([''], function () {
  var SpriteSheet = function (confConstructor, fileConstructor){
    var
      sprites = [],
      configuration = confConstructor,
      img = fileConstructor;

    var init = function (){
      _.forEach(configuration.frames, function (frame){
        var val = frame;
        var cx=-val.frame.w * 0.5;
        var cy=-val.frame.h * 0.5;

        if(val.trimmed)
        {
          cx = val.spriteSourceSize.x - (val.sourceSize.w * 0.5);
          cy = val.spriteSourceSize.y - (val.sourceSize.h * 0.5);

        }
        defSprite(val.filename, val.frame.x, val.frame.y, val.frame.w, val.frame.h, cx, cy);
      });
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
      img: img,
      sprites : sprites
    };
  };

  return SpriteSheet;
});