var c, ctx, num_rms, rm_sz, gap, chr_clr_map, max_grid_sz, max_map_sz, b_sz, map;

function init() {
  // prepate canvas
  c = document.getElementById('display');
  ctx = c.getContext('2d');

  // prepare map variables
  num_rms = 20;
  rm_sz = 8;
  gap = 0;
  chr_clr_map = {'~': 'black', '#': 'white', '.': 'black'};
  
  new_map();
} // init()

function new_map() {
  // adjust sizes to fit map on screen
  max_grid_sz = Math.ceil(Math.sqrt(num_rms) * 2);
  max_map_sz = rm_sz * max_grid_sz + gap * (max_grid_sz - 1);
  b_sz = c.width / max_map_sz;

  // display map
  map = dg.gen(num_rms, rm_sz, gap);

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map.length; col++) {
      ctx.fillStyle = chr_clr_map[map[row][col]];
      ctx.fillRect(col * b_sz, row * b_sz, b_sz+1, b_sz+1);
    }
  }
}

function stringify_map() {
  let map_str = '';
  for (let r of map) {
    map_str += r.join('');
    map_str += '\n';
  }

  return map_str;
}

function dl_map() {
  let map_str = stringify_map();
  download(map_str, "my_dungeon.txt", "text/plain");
}

let clamp = (min, val, max) => Math.min(Math.max(min, val), max);

function set_num_rms(inp) {
  num_rms = parseInt(clamp(1, inp.value, 500));
}

function set_rm_sz(inp) {
  rm_sz = parseInt(clamp(3,inp.value,10));
}

function set_gap(inp) {
  gap = parseInt(clamp(0, inp.value, 5));
}