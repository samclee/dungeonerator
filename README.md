# Dungeonerator
Dungeonerator is an easy way to create a myriad of elegant, randomized dungeons. You can see it in action [here](http://samchristopherlee.com/dungeonerator/).
## Setting up
Simply include the `dg.js` file in your web page with a `<script>` tag. To generate a dungeon, use the function `dg.gen()` like so:
```js
let my_dungeon = dg.gen(number_of_rooms, size_of_rooms);
```
The "dungeon" that the function returns is a 2D array of characters.
## Parameters
The function `dg.gen()` needs at least two arguments, the `number of rooms` and `size of rooms`. All rooms are generated as squares, with the size of rooms being the length of the room's sides (including the walls).

There is an optional third parameter, the `options` object. The object is used to specify the space between the rooms, the probability of merging rooms together, and whether to trim the whitespace around a map. These are specified with the `gap` number, `merge_prob` float, and `trim` boolean members. If left unspecified, these options will default to `0`, `0.25`, and `true`, respectively.
```js
let opt = {};
opt.gap = 4;
opt.merge_prob = 0.35;
opt.trim = false;

let my_dungeon = dg.gen(number_of_rooms, size_of_rooms, opt);
```
