var SpriteSheet = function (confConstructor, fileConstructor){
  "use strict";
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


  function drawSprite(spriteName, posX, posY, context) {
    var spt,
      mapTrans = {};
    spt = _.findWhere(sprites, {id : spriteName});

    if (_.isEmpty(spt))
      return;

    var hlf = {x: spt.cx, y: spt.cy};
    mapTrans.x = 0;
    mapTrans.y = 0;

    /*
    if (settings && settings.rotRadians != null) {
      context.save();
      var rotRadians = Math.PI + settings.rotRadians;

      context.translate(posX - mapTrans.x, posY - mapTrans.y);
      context.rotate(rotRadians); //rotate in origin


      context.drawImage(sheet.img,
        spt.x, spt.y,
        spt.w, spt.h,
        +hlf.x,
        +hlf.y,
        spt.w,
        spt.h);
      context.restore();


    }

    else {
    */
    context.drawImage(img,
      spt.x, spt.y,
      spt.w, spt.h,
      (posX + hlf.x),
      (posY + hlf.y),
      spt.w,
      spt.h);
    /*
    }
    */

  }

  init();
  return {
    sprites : sprites,
    drawSprite : drawSprite
  };
};