# Dungeonerator
Dungeonerator is an easy way to create a myriad of elegant, randomized dungeons. You can see it in action [here](http://samchristopherlee.com/dungeonerator/).
## Setting up
Simply include the `dg.js` file in your web page with a `<script>` tag. like so:
```js
<script src='dg.js'></script>
```
## Usage
```js
dg.gen(num_rms, rm_sz, <options>);
```
__Arguments:__ 
* __num_rms__ (*number*) - The number of rooms in the dungeon
* __rm_sz__ (*number*) - The square foot size of the room
* __options__ (*object*) - An optional list of further dungeon specifications

__Returns:__
* __map__ (*2D String array*) - A 2D array representing the dungeon

## "options" details
The options object should one or more of the following members:
* __gap__ (*number*) - The number of tiles put between rooms. Default is 0.
* __merge_prob__ (*number*) - A float between 0 and 1 that dictates the probability of rooms merging together. Default is 0.30.
* __trim__ (*boolean*) - True if you would like to cut off extra whitespace around the border of the map. Default is true.
