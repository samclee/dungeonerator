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
__Arguments:__ * num_rms (*number*) - The number of rooms in the dungeon
               * rm_sz (*number*) - The square foot size of the room
