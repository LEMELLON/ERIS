import{roll,rollN}from'../core/rng.js';
import{kq,neighbours,ringOf,walk}from'../core/hex.js';
import{BIOMES,biomeFromD20,tileFromD20}from'../data/biomes.js';
const corners=M=>[[-M,M],[0,M],[M,-M],[0,-M]]; // S1 bottom-left, S2 bottom-right, S3 top-right, S4 top-left
const cd=(a,b)=>Math.max(Math.abs(a[0]-b[0]),Math.abs(a[1]-b[1]),Math.abs(a[0]+a[1]-b[0]-b[1]));
export function generate(cfg){const k=cfg.chunkK,M=cfg.rings,A=[k+1,k],B=[-k,2*k+1],T={},log=[];
const chunks=[{o:[0,0],boss:1,nm:'Boss'}];for(let p=1;p<=M;p++)walk(p).forEach(o=>chunks.push({o,nm:'H'+chunks.length}));
const sp=corners(M).map(c=>chunks.find(x=>x.o[0]===c[0]&&x.o[1]===c[1]));sp.forEach((c,i)=>{c.spawn=i+1;c.nm='S'+(i+1)});
const used=new Set();for(const c of sp){for(;;){const b=biomeFromD20(roll(20,c.nm+' biome','Spawn '+c.nm));if(!used.has(b)){used.add(b);c.b=b;log.push(c.nm+' → '+BIOMES[b].id);break}}}
for(const c of chunks)if(c.b==null&&!c.boss){
 if(cfg.directional){let best=1e9,pick=[];for(const s of sp){const d=cd(c.o,s.o);if(d<best){best=d;pick=[s]}else if(d===best)pick.push(s)}
  c.b=(pick.length>1?pick[rollN(pick.length,c.nm+' tie',c.nm)-1]:pick[0]).b}
 else c.b=biomeFromD20(roll(20,c.nm+' biome',c.nm))}
for(const c of chunks){c.key=(c.o[0]*A[0]+c.o[1]*B[0])+','+(c.o[0]*A[1]+c.o[1]*B[1]);const[cq,cr]=kq(c.key);
 for(let a=-k;a<=k;a++)for(let b=Math.max(-k,-a-k);b<=Math.min(k,-a+k);b++){const q=cq+a,r=cr+b,id=q+','+r;if(T[id])continue;
  const ring=ringOf(q,r),t={q,r,ring,ch:c.nm,b:c.boss?-1:c.b};
  t.t=c.boss?(ring===0?'B':'P'):ring===1?'P':tileFromD20(c.b,roll(20,c.nm+' tile',c.nm));T[id]=t}}
for(const c of sp){const t=T[c.key];t.t='P';t.sp=c.spawn;t.shop=1}
BIOMES.forEach((bm,bi)=>{const cand=chunks.filter(c=>!c.boss&&!c.spawn&&c.b===bi);if(!cand.length){log.push('No free chunk of '+bm.id+' for its Guardian');return}
 const c=cand[rollN(cand.length,'Guardian '+bm.id)-1],t=T[c.key];t.t='G';t.guardian=bm.id;log.push('Guardian of '+bm.id+' in '+c.nm)});
for(let g=0;g<500;g++){const seen={},q=[];for(const id in T)if(T[id].ring===1){seen[id]=1;q.push(id)}
 while(q.length){const id=q.pop();for(const n of neighbours(id,T))if(!seen[n]&&T[n].t!=='W'){seen[n]=1;q.push(n)}}
 const bad=Object.keys(T).filter(id=>!seen[id]&&T[id].t!=='W'&&T[id].t!=='B');let did=0;
 for(const id of bad){const w=neighbours(id,T).filter(n=>T[n].t==='W');if(w.length){T[w[rollN(w.length,'open wall')-1]].t='P';did=1;break}}if(!did)break}
return{T,chunks,log}}
export const DEFAULT_CFG={seed:7,chunkK:1,rings:2,directional:false};
