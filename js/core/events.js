const h={};export const on=(t,f)=>(h[t]=h[t]||[]).push(f);export const emit=(t,p)=>(h[t]||[]).forEach(f=>f(p));
