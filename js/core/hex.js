export const DR=[[1,0],[1,-1],[0,-1],[-1,0],[-1,1],[0,1]];
export const kq=k=>k.split(',').map(Number);
export const dist=(a,b)=>{const[q,r]=kq(a),[x,y]=kq(b);return(Math.abs(q-x)+Math.abs(r-y)+Math.abs(q+r-x-y))/2};
export const ringOf=(q,r)=>Math.max(Math.abs(q),Math.abs(r),Math.abs(q+r));
export const neighbours=(k,T)=>{const[q,r]=kq(k);return DR.map(a=>(q+a[0])+','+(r+a[1])).filter(x=>T[x])};
export function walk(p){const o=[];let q=-p,r=p;for(let s=0;s<6;s++)for(let j=0;j<p;j++){o.push([q,r]);q+=DR[s][0];r+=DR[s][1]}return o}
