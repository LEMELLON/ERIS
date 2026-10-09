import{roll}from'../core/rng.js';
/** PvE attack: 2d6 + mod + prof >= defense. Nat 12 crit (ignores DEF, x2), nat 2 miss. */
export function attackRoll(bonus,def,label='Attack'){const a=roll(6,label,label),b=roll(6,label,label),n=a+b;
if(n===2)return{n,total:n+bonus,hit:false,crit:false,miss:true};
if(n===12)return{n,total:n+bonus,hit:true,crit:true};
return{n,total:n+bonus,hit:n+bonus>=def,crit:false}}
export const damage=(base,m,crit)=>Math.max(0,Math.floor(base*m*(crit?2:1)));
