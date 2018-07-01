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

dg.add_pts = (pt1, pt2) => ({x: pt1.x + pt2.x, y: pt1.y + pt2.y});

dg.dirs = [{x: 0, y: -1}, {x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 0}];

dg.rand_int_in_range = (min, max) => Math.floor(Math.random() * (max - min)) + min;

dg.find_valid_dir = (g_l, rm_grid) => {
  let ret_dir = undefined;
  let in_range = false;

  do {
    ret_dir = dg.dirs[dg.rand_int_in_range(0, 4)];
    let new_l = {x: g_l.x + ret_dir.x, y: g_l.y + ret_dir.y};
    in_range = 0 <= new_l.x && new_l.x < rm_grid.length &&
                0 <= new_l.y && new_l.y < rm_grid.length;
  } while (!in_range)

  return ret_dir;
}

dg.copy_pt = (pt) => ({x: pt.x, y: pt.y});

dg.connect_rms = (g_l1, g_l2) => {

}

dg.find_open = (start_l, rm_grid) => {
  let new_l = {x: start_l.x, y: start_l.y};
  let last_l = dg.copy_pt(new_l);

  do {
    let new_dir = dg.find_valid_dir(new_l, rm_grid);

    last_l = dg.copy_pt(new_l);
    new_l = dg.add_pts(new_l, new_dir);
  } while (rm_grid[new_l.y][new_l.x] === 1)

  //dg.connect_rms(last_l, new_l);

  return new_l;
}

dg.grid2map = (g_l, rm_sz, gap) => (
  {x: g_l.x * (rm_sz + gap), y: g_l.y * (rm_sz + gap)}
);

dg.carve_rm = (g_l, map, rm_sz, gap) => {
  let rm_base = dg.grid2map(g_l, rm_sz, gap);

  for (let row = rm_base.y; row < rm_base.y + rm_sz; row++) {
    for (let col = rm_base.x; col < rm_base.x + rm_sz; col++) {
      if(row === rm_base.y || row === rm_base.y + rm_sz - 1
          || col === rm_base.x || col === rm_base.x + rm_sz - 1)
        map[row][col] = '#';
      else
        map[row][col] = '.';
    }
  }
}

dg.gen = (num_rms, rm_sz, gap) => {
  // prepate grid and map variables
  let max_grid_sz = Math.ceil(Math.sqrt(num_rms) * 2); // change this to change map size
  console.log(max_grid_sz)
  let rm_grid = dg.populate2d(max_grid_sz, 0);

  let max_map_sz = rm_sz * max_grid_sz + gap * (max_grid_sz - 1);
  let map = dg.populate2d(max_map_sz, '~');

  // place center room
  let ctr_l = {x: Math.floor(max_grid_sz / 2), y: Math.floor(max_grid_sz / 2)}; 
  dg.carve_rm(ctr_l, map, rm_sz, gap);
  rm_grid[ctr_l.y][ctr_l.x] = 1;

  // place other rooms
  let rms_left = num_rms;
  while (rms_left) {
    let new_l = dg.find_open(ctr_l, rm_grid);
    dg.carve_rm(new_l, map, rm_sz, gap);
    rm_grid[new_l.y][new_l.x] = 1;


    rms_left--;
  }
  
  return map;
}