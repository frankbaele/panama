define(['underscore', 'canvas', 'standardlib', 'world', 'assets'], function (_,canvases, standardlib, world, assets) {
  function draw (spriteName, posX, posY, layer) {
    var spt,
      mapTrans = {},
      context,
      coordinates,
      canvas,
      hlf,
      img;

    //lookup the context
    switch (layer) {
      case 'terrain' :
        context = canvases.terrain.context;
        canvas = canvases.terrain.canvas;
        break;
      case 'player' :
        context = canvases.player.context;
        canvas = canvases.player.canvas;
         break;
      default:
        return;
    }

    // transform the grid tile to iso coordinates
    coordinates = standardlib.twoDToIso(posX, posY);
    // transform the coordinates to the actual size of the map
    coordinates.x = (coordinates.x * world.tileWidth + ((canvas.width) / 2));
    coordinates.y = coordinates.y * world.tileHeight + world.tileHeight/2;
    // For lop trough all the atlasses with find, because we want to exit this loop when the atlas is found.

    _.findIndex(assets.loaded.atlas, function (sheet) {
      // Search for a sprite with the same sprite name
      spt = _.findWhere(sheet.sprite.sprites, {id: spriteName});
      img = sheet.sprite.img;
      // exit find loop when sprite is found.
      if (!_.isEmpty(sheet)) {
        return;
      }
    });
    if (_.isEmpty(spt)) {
      return;
    }
    mapTrans.x = 0;
    mapTrans.y = 0;
    context.drawImage(img,
      spt.x, spt.y,
      spt.w, spt.h,
      (coordinates.x - spt.w/2),
      (coordinates.y - spt.h),
      spt.w,
      spt.h);
  };
  return {
    draw: draw
  };
});