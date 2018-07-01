function init() {
  // prepate canvas
  let c = document.getElementById('display');
  let ctx = c.getContext('2d');

  // prepare map variables
  let num_rms = 50;
  let rm_sz = 7;
  let gap = 0;
  let chr_clr_map = {'~': 'lime', '#': '#ff86f4', '.': '#ffffbe'}
  
  // adjust sizes to fit map on screen
  let max_grid_sz = Math.ceil(Math.sqrt(num_rms) * 2);
  let max_map_sz = rm_sz * max_grid_sz + gap * (max_grid_sz - 1);
  let b_sz = c.width / max_map_sz;

  // display map
  let map = dg.gen(num_rms, rm_sz, gap);

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map.length; col++) {
      ctx.fillStyle = chr_clr_map[map[row][col]];
      //if (row === map.length - 1 || col === map.length - 1)
      //  ctx.fillStyle = 'red'
      ctx.fillRect(col * b_sz, row * b_sz, b_sz, b_sz);
    }
  }

} // init()