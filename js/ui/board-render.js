import{BIOMES}from'../data/biomes.js';
const S3=Math.sqrt(3),SZ=22,G={W:'▲',O:'✕',B:'☠',C:'▣',M:'M',G:'♛'};
const hp=(x,y)=>[0,1,2,3,4,5].map(i=>{const a=Math.PI/180*(60*i-30);return(x+SZ*Math.cos(a)).toFixed(1)+','+(y+SZ*Math.sin(a)).toFixed(1)}).join(' ');
export function render(T){let o='',R=1;for(const id in T){const t=T[id];R=Math.max(R,t.ring);const x=SZ*(S3*t.q+S3/2*t.r),y=SZ*1.5*t.r;
 const f=t.t==='W'?'#2b2b32':t.t==='O'?'#4a4a4a':t.t==='B'?'#0b0b0b':t.b>=0?BIOMES[t.b].col:'#333';
 const g=t.sp?'⌂':G[t.t]||'';
 o+=`<polygon points="${hp(x,y)}" fill="${f}" stroke="#0008"><title>${t.ch} ${t.t}${t.guardian?' Guardian of '+t.guardian:''}</title></polygon>${g?`<text x="${x}" y="${y+5}" fill="#fff" font-size="12" text-anchor="middle" pointer-events="none">${g}</text>`:''}`}
const E=SZ*S3*(R+1.2),F=SZ*1.6*(R+1.2);return`<svg viewBox="${-E} ${-F} ${2*E} ${2*F}">${o}</svg>`}
