import{prof}from'../data/levels.js';
export const mod=s=>Math.floor(s/5)-1; // ASSUMPTION (handoff #3): confirm
export const maxHP=(c,lv=1)=>20+mod(c.st.VIT)*(prof(lv)+1)+mod(c.st.STR)*2;
export const maxMP=c=>10+mod(c.st.INT)*5;
export const physDef=c=>c.st.VIT*2;export const magDef=c=>c.st.INT*2;
export const speed=c=>1+Math.floor(c.st.AGI/5);
export const upgradeCost=s=>s*6;
// Placeholder mob scaling (handoff #1), editable
export const MOB={hp:cr=>15+8*cr,def:cr=>6+Math.floor(cr/2),dmg:cr=>cr};
