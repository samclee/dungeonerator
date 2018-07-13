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

There is an optional third parameter, the `options` object. You can specify the space between the rooms by giving `options` a `gap` member and the probability of merging together rooms by giving `options` a `merge_prob` member.
```js
let opt = {};
opt.gap = 4;
opt.merge_prob = 0.35;

let my_dungeon = dg.gen(number_of_rooms, size_of_rooms, opt);
```
