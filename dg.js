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

dg.grid2map = (g_l, rm_sz, gap) => (
  {x: g_l.x * (rm_sz + gap), y: g_l.y * (rm_sz + gap)}
);

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

dg.connect_hzt = (m_l1, m_l2, map, rm_sz, gap) => {
  let lft_most = ((m_l1.x < m_l2.x) ? m_l1.x : m_l2.x) + (rm_sz - 1);
  let rgt_most = lft_most + gap + 1;

  // fill in-between area with brick
  for (let row = m_l1.y; row < m_l1.y + rm_sz; row++) {
    for (let col = lft_most + 1; col < rgt_most; col ++)
      map[row][col] = '#'
  }

  // draw main line(s)
  for (let i = lft_most; i <= rgt_most; i++)
    map[m_l1.y + Math.floor(rm_sz / 2)][i] = '.';

  if (rm_sz % 2 === 0) {
    for (let i = lft_most; i <= rgt_most; i++)
      map[m_l1.y + Math.floor(rm_sz / 2) - 1][i] = '.';
  }
}

dg.connect_vrt = (m_l1, m_l2, map, rm_sz, gap) => {
  let top_most = ((m_l1.y < m_l2.y) ? m_l1.y : m_l2.y) + (rm_sz - 1);
  let btm_most = top_most + gap + 1;

  // fill in-between area with brick
  for (let row = top_most + 1; row < btm_most; row++) {
    for (let col = m_l1.x; col < m_l1.x + rm_sz; col ++)
      map[row][col] = '#'
  }

  // draw main line(s)
  for (let i = top_most; i <= btm_most; i++)
    map[i][m_l1.x + Math.floor(rm_sz / 2)] = '.';

  if (rm_sz % 2 === 0) {
    for (let i = top_most; i <= btm_most; i++)
      map[i][m_l1.x + Math.floor(rm_sz / 2) - 1] = '.';
  }
}

dg.carve_tnl = (g_l1, g_l2, map, rm_sz, gap) => {
  let m_l1 = dg.grid2map(g_l1, rm_sz, gap);
  let m_l2 = dg.grid2map(g_l2, rm_sz, gap);

  if (m_l1.y === m_l2.y)
    dg.connect_hzt(m_l1, m_l2, map, rm_sz, gap);
  else
    dg.connect_vrt(m_l1, m_l2, map, rm_sz, gap);
}

dg.find_open = (start_l, rm_grid, map, rm_sz, gap) => {
  let new_l = {x: start_l.x, y: start_l.y};
  let last_l = dg.copy_pt(new_l);

  do {
    let new_dir = dg.find_valid_dir(new_l, rm_grid);

    last_l = dg.copy_pt(new_l);
    new_l = dg.add_pts(new_l, new_dir);
  } while (rm_grid[new_l.y][new_l.x] === 1)

  return [new_l, last_l];
}

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
    // find location of new room
    let tnl_info = dg.find_open(ctr_l, rm_grid, map, rm_sz, gap);
    let new_l = tnl_info[0];
    let last_l = tnl_info[1];

    // carve new room into dungeon
    dg.carve_rm(new_l, map, rm_sz, gap);

    // carve runnel between last room and current room
    dg.carve_tnl(new_l, last_l, map, rm_sz, gap);

    // record room on room grid
    rm_grid[new_l.y][new_l.x] = 1;

    rms_left--;
  }
  
  return map;
}