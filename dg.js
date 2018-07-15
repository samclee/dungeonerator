/*
 *
 * dg.js
 *
 */

let dg = {}

dg._populate2d = (sz, c) => {
  let mx = [];
  for (let i = 0; i < sz; i++) {
    mx.push([]);
    for (let j = 0; j < sz; j++)
      mx[i].push(c);
  }

  return mx;
}

dg._grid2map = (g_l, rm_sz, gap) => ({x: g_l.x * (rm_sz + gap), y: g_l.y * (rm_sz + gap)});

dg._add_pts = (pt1, pt2) => ({x: pt1.x + pt2.x, y: pt1.y + pt2.y});

dg._dirs = [{x: 0, y: -1}, {x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 0}];

dg._rand_int_in_range = (min, max) => Math.floor(Math.random() * (max - min)) + min;

dg._find_valid_dir = (g_l, rm_grid) => {
  let ret_dir = undefined;
  let in_range = false;

  do {
    ret_dir = dg._dirs[dg._rand_int_in_range(0, 4)];
    let new_l = {x: g_l.x + ret_dir.x, y: g_l.y + ret_dir.y};
    in_range = 0 <= new_l.x && new_l.x < rm_grid.length &&
                0 <= new_l.y && new_l.y < rm_grid.length;
  } while (!in_range)

  return ret_dir;
}

dg._copy_pt = (pt) => ({x: pt.x, y: pt.y});

dg._connect_hzt = (m_l1, m_l2, map, rm_sz, gap) => {
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

dg._connect_vrt = (m_l1, m_l2, map, rm_sz, gap) => {
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

dg._merge_hzt = (m_l1, m_l2, map, rm_sz, gap) => {
  let lft_most = ((m_l1.x < m_l2.x) ? m_l1.x : m_l2.x) + (rm_sz - 1);
  let rgt_most = lft_most + gap + 1;

  // fill in-between area with path
  for (let row = m_l1.y; row < m_l1.y + rm_sz; row++) {
    for (let col = lft_most; col <= rgt_most; col ++)
      map[row][col] = '.';
  }

  // draw main line(s)
  for (let i = lft_most; i <= rgt_most; i++) {
    map[m_l1.y][i] = '#';
    map[m_l1.y + rm_sz - 1][i] = '#';
  }
}

dg._merge_vrt = (m_l1, m_l2, map, rm_sz, gap) => {
  let top_most = ((m_l1.y < m_l2.y) ? m_l1.y : m_l2.y) + (rm_sz - 1);
  let btm_most = top_most + gap + 1;

  // fill in-between area with brick
  for (let row = top_most; row <= btm_most; row++) {
    for (let col = m_l1.x; col < m_l1.x + rm_sz; col ++)
      map[row][col] = '.';
  }

  // draw main line(s)
  for (let i = top_most; i <= btm_most; i++) {
    map[i][m_l1.x] = '#';
    map[i][m_l1.x + rm_sz - 1] = '#';
  }
}

dg._carve_tnl = (g_l1, g_l2, map, rm_sz, gap, merge_prob) => {
  let m_l1 = dg._grid2map(g_l1, rm_sz, gap);
  let m_l2 = dg._grid2map(g_l2, rm_sz, gap);
  let create_tnl = Math.random() + 0.000000001 > merge_prob;

  if (m_l1.y === m_l2.y) {
    if(create_tnl)
      dg._connect_hzt(m_l1, m_l2, map, rm_sz, gap);
    else
      dg._merge_hzt(m_l1, m_l2, map, rm_sz, gap);
  } else {
    if(create_tnl)
      dg._connect_vrt(m_l1, m_l2, map, rm_sz, gap);
    else
      dg._merge_vrt(m_l1, m_l2, map, rm_sz, gap);
  }
}

dg._find_open = (start_l, rm_grid, map, rm_sz, gap) => {
  let new_l = {x: start_l.x, y: start_l.y};
  let last_l = dg._copy_pt(new_l);

  do {
    let new_dir = dg._find_valid_dir(new_l, rm_grid);
    last_l = dg._copy_pt(new_l);
    new_l = dg._add_pts(new_l, new_dir);
  } while (rm_grid[new_l.y][new_l.x] === 1)

  return [new_l, last_l];
}

dg._carve_rm = (g_l, map, rm_sz, gap) => {
  let rm_base = dg._grid2map(g_l, rm_sz, gap);

  for (let row = rm_base.y; row < rm_base.y + rm_sz; row++) {
    for (let col = rm_base.x; col < rm_base.x + rm_sz; col++) {
      //console.log('tile to be placed at row: ' + row + ', col: ' + col);
      if(row === rm_base.y || row === rm_base.y + rm_sz - 1
          || col === rm_base.x || col === rm_base.x + rm_sz - 1) {
        map[row][col] = '#';
      } else {
        map[row][col] = '.';
      }
    }
  }
}

dg.gen = (num_rms, rm_sz, opt) => {
  opt = opt || {gap: 0, merge_prob: 0.25, trim: false};
  opt.gap = (opt.gap === undefined) ? 0 : opt.gap; // inline condit to compensate for 0 falseness
  opt.merge_prob = (opt.merge_prob === undefined) ? 0.25 : opt.merge_prob;
  opt.trim = opt.trim || false;

  console.log('Generating <' + num_rms + '> rooms of size <' + rm_sz +
                '> tiles with <' + opt.gap + '> tiles in between.');
  console.log('Probability of halls occuring is <' + (opt.merge_prob * 100) + '> percent.');
  

  // prepare grid and map variables
  let max_grid_sz = Math.ceil(Math.sqrt(num_rms) * 2); // change this to change map size
  let rm_grid = dg._populate2d(max_grid_sz, 0);

  let max_map_sz = rm_sz * max_grid_sz + opt.gap * (max_grid_sz - 1);
  let map = dg._populate2d(max_map_sz, '~');

  // prepare variables to track map bounds
  let bnd_lft = max_grid_sz / 2, bnd_rgt = max_grid_sz / 2, 
      bnd_top = max_grid_sz / 2, bnd_btm = max_grid_sz / 2;

  // place center room
  let ctr_l = {x: Math.floor(max_grid_sz / 2), y: Math.floor(max_grid_sz / 2)}; 
  dg._carve_rm(ctr_l, map, rm_sz, opt.gap);
  rm_grid[ctr_l.y][ctr_l.x] = 1;

  // place other rooms
  let rms_left = num_rms;
  while (rms_left > 1) {
    // find location for new room and room it branched from
    let tnl_info = dg._find_open(ctr_l, rm_grid, map, rm_sz, opt.gap);
    let new_l = tnl_info[0];
    let last_l = tnl_info[1];

    // carve new room into dungeon
    dg._carve_rm(new_l, map, rm_sz, opt.gap);

    // change trimmed map bounds
    if (new_l.x < bnd_lft)
      bnd_lft = new_l.x;
    else if (bnd_rgt < new_l.x)
      bnd_rgt = new_l.x;

    if (new_l.y < bnd_top)
      bnd_top = new_l.y;
    else if (bnd_btm < new_l.y)
      bnd_btm = new_l.y

    // carve tunnel between last room and current room
    dg._carve_tnl(new_l, last_l, map, rm_sz, opt.gap, opt.merge_prob);

    // record room on room grid
    rm_grid[new_l.y][new_l.x] = 1;

    rms_left--;
  }

  // map_bnd_* is the bnds of the map *inclusive*
  let map_bnd_lft = bnd_lft * (rm_sz + opt.gap);
  let map_bnd_rgt = (bnd_rgt + 1) * (rm_sz + opt.gap) - 1; // the +/-1 puts the bound on the other side of the col
  let map_bnd_btm = (bnd_btm + 1) * (rm_sz + opt.gap) - 1; // the +/-1 puts the bound on the other side of the row
  let map_bnd_top = bnd_top * (rm_sz + opt.gap);

  console.log('Grid spans from cols <' + bnd_lft + '-' + bnd_rgt + '> and rows <' + 
                  bnd_top + '-' + bnd_btm + '>.');
  console.log('Map spans from cols <' + map_bnd_lft + '-' + map_bnd_rgt + '> and rows <' +
                  map_bnd_top + '-' + map_bnd_btm + '>.');
  console.log('Trimmed map should be of width <' + (map_bnd_rgt - map_bnd_lft + 1) + '> and height <' +
                  (map_bnd_btm - map_bnd_top + 1) + '>.');

  if (true) {
    let trimmed_map = [];

    for (let row = 0; row < map_bnd_btm - map_bnd_top + 1 ; row++) {
      trimmed_map.push([]);
      for (let col = 0; col < map_bnd_rgt - map_bnd_lft + 1; col++) {
        //let map_tile = map[map_bnd_top + row][map_bnd_lft + col];
        //trimmed_map[row].push(map_tile);
        if (map[map_bnd_top + row][map_bnd_lft + col] === '#')
          map[map_bnd_top + row][map_bnd_lft + col] = '$';
        else if (map[map_bnd_top + row][map_bnd_lft + col] === '.')
          map[map_bnd_top + row][map_bnd_lft + col] = '*';
        else if(map[map_bnd_top + row][map_bnd_lft + col] === '~')
          map[map_bnd_top + row][map_bnd_lft + col] = '*';
      }
    }
    return map;
  }
  
  return map;
}