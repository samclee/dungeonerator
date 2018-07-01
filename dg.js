/*
 *
 * dg.js
 *
 */

let dg = {}

dg.populate2d = (sz, c) => {
  let mx = [];
  for (let i = 0; i < sz; i++) {
    mx.push([]);
    for (let j = 0; j < sz; j++)
      mx[i].push(c);
  }

  return mx;
}

dg.pt = class {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(p2) {
    return new dg.pt(this.x + p2.x, this.y + p2.y);
  }
}

dg.rand_int_in_range = (min, max) => Math.floor(Math.random() * (max - min)) + min;

dg.grid2map = (grid_l, rm_sz, gap) => new dg.pt(g_l * (rm_sz + gap), g_l * (rm_sz + gap));

dg.find_open = (start_l, grid) => {

}

dg.carve_rm = (grid_l, map) => {

}

dg.connect_rms = (grid_l1, grid_l2) => {

}

dg.gen = (num_rms, rm_sz, gap) => {
  let max_map_sz = rm_sz * num_rms + gap * (num_rms - 1);
  
  let rm_grid = dg.populate2d(num_rms, 0);
  let map = dg.populate2d(max_map_sz, '~');

  let rms_left = num_rms;
  
  return map;
}