var c, ctx, num_rms, rm_sz, options, chr_clr_map, b_sz, map;

function init() {
  // prepate canvas
  c = document.getElementById('display');
  ctx = c.getContext('2d');

  // prepare map variables
  num_rms = 20;
  rm_sz = 8;
  options = {gap: 0, merge_prob: 0.30, trim: true};
  chr_clr_map = {'~': 'black', '#': 'white', '.': 'black', '$': 'lime', '*': 'yellow'};
  
  new_map();
} // init()

function new_map() {
  // display map
  map = dg.gen(num_rms, rm_sz, options);
  
  let longer_axis = (map.length > map[0].length) ? map.length : map[0].length;// map.length = hgt, map[0].length = wid
  b_sz = c.width / longer_axis

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, c.width, c.height);
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
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

let set_num_rms = (inp) => { num_rms = parseInt(clamp(1, inp.value, 500)) }

let set_rm_sz = (inp) => { rm_sz = parseInt(clamp(3,inp.value,10)) }

let set_gap = (inp) => { options.gap = parseInt(clamp(0, inp.value, 5)) }

let set_merge_prob = (inp) => { options.merge_prob = parseInt(clamp(0, inp.value, 100)) / 100 }

let set_trim = (inp) => { options.trim = (inp.value === 'true') ? true : false }