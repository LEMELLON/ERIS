// Ability MP spending and once-per-boss-fight ultimates.
// The per-class ability tables (Lv1/3/5/7/10) are not in the handoff, so effects are NOT encoded yet;
// add them to data/abilities.js and call spendMp/useUltimate from here.
export function spendMp(ch, cost) {
  if (ch.mp < cost) return { ok: false, ch };
  return { ok: true, ch: { ...ch, mp: ch.mp - cost } };
}

export function useUltimate(encounter, charName) {
  const used = encounter.ultimatesUsed || [];
  if (used.includes(charName)) return { ok: false, encounter };
  return { ok: true, encounter: { ...encounter, ultimatesUsed: [...used, charName] } };
}

import { ABILITIES } from '../data/abilities.js';

// Abilities unlock only by level: Lv1 basic, Lv3/5/7 skills, Lv10 ultimate.
export const abilitiesFor = (cls, level) => ABILITIES[cls].list.filter(a => a.lv <= level);
export const basicAttackAttr = cls => ABILITIES[cls].attackAttr;
