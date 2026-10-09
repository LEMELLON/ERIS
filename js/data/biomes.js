// All numbers live here (editable from setup). Tile rows are PROPOSED, see handoff 4.2.
export const BIOMES=[
 {id:'Pyria',el:'Fire',col:'#a8402a',die:[1,5],row:{path:6,mob:12,wall:15,obs:19}},
 {id:'Hydoria',el:'Water',col:'#2f6fa8',die:[6,10],row:{path:6,mob:10,wall:12,obs:18}},
 {id:'Aeria',el:'Air',col:'#4f9c88',die:[11,15],row:{path:6,mob:10,wall:16,obs:18}},
 {id:'Geia',el:'Earth',col:'#85663a',die:[16,20],row:{path:6,mob:10,wall:17,obs:18}}];
export const biomeFromD20=v=>BIOMES.findIndex(b=>v>=b.die[0]&&v<=b.die[1]);
export const tileFromD20=(bi,v)=>{const r=BIOMES[bi].row;return v<=r.path?'P':v<=r.mob?'M':v<=r.wall?'W':v<=r.obs?'O':'C'};
