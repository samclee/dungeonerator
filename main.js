var c, ctx, num_rms, rm_sz, gap, chr_clr_map, b_sz, map;

function init() {
  // prepate canvas
  c = document.getElementById('display');
  ctx = c.getContext('2d');

  // prepare map variables
  num_rms = 40;
  rm_sz = 8;
  gap = 0;
  chr_clr_map = {'~': 'black', '#': 'white', '.': 'black'};
  
  // adjust sizes to fit map on screen
  let max_grid_sz = Math.ceil(Math.sqrt(num_rms) * 2);
  let max_map_sz = rm_sz * max_grid_sz + gap * (max_grid_sz - 1);
  b_sz = c.width / max_map_sz;

  // display map
  map = dg.gen(num_rms, rm_sz, gap);

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map.length; col++) {
      ctx.fillStyle = chr_clr_map[map[row][col]];
      ctx.fillRect(col * b_sz, row * b_sz, b_sz+1, b_sz+1);
    }
  }
} // init()

function new_map() {
  // display map
  let map = dg.gen(num_rms, rm_sz, gap);

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map.length; col++) {
      ctx.fillStyle = chr_clr_map[map[row][col]];
      ctx.fillRect(col * b_sz, row * b_sz, b_sz+1, b_sz+1);
    }
  }
}

function dl_map() {
  let map_str = JSON.stringify(map);
  download(map_str, "my_dungeon.json", "text/json");
}