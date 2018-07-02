function init() {
  // prepate canvas
  let c = document.getElementById('display');
  let ctx = c.getContext('2d');

  // prepare map variables
  let num_rms = 40;
  let rm_sz = 8;
  let gap = 0;
  let thm1 = {'~': 'lime', '#': '#ff86f4', '.': '#ffffbe'};
  let thm2 = {'~': 'black', '#': 'white', '.': 'black'};
  let chr_clr_map = thm2;
  
  // adjust sizes to fit map on screen
  let max_grid_sz = Math.ceil(Math.sqrt(num_rms) * 2);
  let max_map_sz = rm_sz * max_grid_sz + gap * (max_grid_sz - 1);
  let b_sz = c.width / max_map_sz;

  // display map
  let map = dg.gen(num_rms, rm_sz, gap);

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map.length; col++) {
      ctx.fillStyle = chr_clr_map[map[row][col]];
      ctx.fillRect(col * b_sz, row * b_sz, b_sz+1, b_sz+1);
    }
  }

} // init()

