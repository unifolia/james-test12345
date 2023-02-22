module.exports = (function() {
  let embedTilePresent = false;
  
  if (
    window.location.href.indexOf('?embedtile') !== -1 ||
    window.location.href.indexOf('embed_cta') !== -1
  ) {
    embedTilePresent = true;

    const embedTile = document.querySelector('.tile.single');

    if (embedTile) {
      embedTile.style.position = 'fixed';
      embedTile.style.top = '0';
      embedTile.style.left = '0';
      embedTile.style.zIndex = '2147483647';
      embedTile.style.opacity = '1';
      embedTile.style.transform = 'none';
      embedTile.style.animationName = 'initial';
      embedTile.style.animationDuration = '0s';
      embedTile.style.visibility = 'visible';
    }
  }
  
  return embedTilePresent;
}());
