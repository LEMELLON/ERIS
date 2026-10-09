import{emit}from'./events.js';
export function mulberry32(seed){let a=seed>>>0;const f=()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};f.get=()=>a;f.set=v=>{a=v>>>0};return f}
let rng=mulberry32(1),queue=[];
export const seed=s=>{rng=mulberry32(s)};export const rngState=()=>rng.get();export const setRngState=v=>rng.set(v);
export const typed=a=>{queue=a.slice()};
/** Single entry point for every roll. Result is decided here; UI only visualises it. */
export function roll(sides,label='',group=''){let v=null;if(queue.length){const x=queue.shift();if(x>=1&&x<=sides)v=x}
if(v==null)v=1+Math.floor(rng()*sides);emit('roll',{sides,v,label,group});return v}
export const nd=(n,s,l,g)=>{let t=0;for(let i=0;i<n;i++)t+=roll(s,l,g);return t};
/** roll 1..n for any n (smallest die >= n, reroll overs; >20 uses percentile) */
export function rollN(n,label,group){if(n<=1)return 1;if(n>20){const a=roll(10,label+' tens',group)-1,b=roll(10,label+' ones',group)-1;return((a*10+b||100)-1)%n+1}
const die=[4,6,8,10,12,20].find(x=>x>=n);for(;;){const v=roll(die,label,group);if(v<=n)return v}}
