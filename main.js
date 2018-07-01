function init() {
  // prepate canvas
  let c = document.getElementById('display');
  let ctx = c.getContext('2d');
  let font_sz = 1;
  ctx.font = font_sz + 'px Monospace';

  // adjust font size to fit entire map
  let num_rms = 9;
  let rm_sz = 3;
  let gap = 0;
  
  let max_map_sz = rm_sz * num_rms + gap * (num_rms - 1);
  let test_str = 'a'.repeat(max_map_sz);

  while (ctx.measureText(test_str).width < c.width) {
    ctx.font = (++font_sz) + 'px Monospace';
  }
  console.log('Maximum font size is', font_sz);

  // display map
  let map = dg.gen(num_rms, rm_sz, gap);

  let c_wdt = ctx.measureText('a').width;

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map.length; col++) {
      if (row === (map.length - 1) || col === (map.length - 1))
        ctx.fillStyle = 'red';
      else
        ctx.fillStyle = 'black';
      ctx.fillText(map[row][col], col * c_wdt, row * font_sz * (7/12));
    }
  }

} // init()