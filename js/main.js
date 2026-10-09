import{seed}from'./core/rng.js';import{on}from'./core/events.js';import{save,load}from'./core/storage.js';
import{generate,DEFAULT_CFG}from'./world/generate.js';import{render}from'./ui/board-render.js';
let cfg=load('config')||{...DEFAULT_CFG},rolls=[];
document.getElementById('app').innerHTML=`<div id=shell><div id=bd></div><div id=side><h2 style="margin:0">Athanasia</h2>
<div><label>Seed <input id=sd type=number style="width:80px"></label> <label>Rings <input id=rg type=number min=1 max=6 style="width:50px"></label>
<label><input id=dr type=checkbox> Directional</label></div><div><button id=go>Generate</button> <button id=rs>New seed</button></div>
<div id=dice></div><div id=log></div></div></div>`;
const $=s=>document.querySelector(s);$('#sd').value=cfg.seed;$('#rg').value=cfg.rings;$('#dr').checked=cfg.directional;
on('roll',r=>{rolls.push(r);if(rolls.length>8)rolls.shift();$('#dice').innerHTML=rolls.map(r=>`<span class=die title="d${r.sides} ${r.label}">${r.v}</span>`).join('')});
function go(){cfg={...cfg,seed:+$('#sd').value,rings:Math.max(1,+$('#rg').value||2),directional:$('#dr').checked};save('config',cfg);seed(cfg.seed);
 const w=generate(cfg);$('#bd').innerHTML=render(w.T);$('#log').innerHTML=`<b>${Object.keys(w.T).length} tiles</b><br>`+w.log.join('<br>')}
$('#go').onclick=go;$('#rs').onclick=()=>{$('#sd').value=Math.floor(Math.random()*99999);go()};go();
