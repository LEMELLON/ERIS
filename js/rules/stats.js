import { MAX_ATTRIBUTE, proficiencyForLevel } from '../data/levels.js';

// Modifier = floor(score / 5) - 1 (10 -> 1, 15 -> 2, 20 -> 3), matching the GDD table.
export const modifier = score => Math.floor(score / 5) - 1;

// GDD section 1: HP, MP, defenses and initiative use MODIFIERS (Bhana L1 = 32 HP, 15 MP, DEF 4/2).
// Speed uses the raw AGI score.
export function derive({ attrs, level }) {
  const prof = proficiencyForLevel(level);
  const m = k => modifier(attrs[k]);
  return {
    proficiency: prof,
    maxHp: 20 + m('VIT') * (prof + 1) + m('STR') * 2,
    maxMp: 10 + m('INT') * 5,
    physDef: m('VIT') * 2,
    magDef: m('INT') * 2,
    speed: 1 + Math.floor(attrs.AGI / 5),
  };
}

export const rollInitiative = (roller, attrs) => roller.roll(20, 'Initiative') + modifier(attrs.AGI);

export function createCharacter(champion, level = 1) {
  const attrs = { ...champion.attrs };
  const d = derive({ attrs, level });
  return {
    name: champion.name, cls: champion.cls, element: champion.homeElement,
    level, attrs, hp: d.maxHp, mp: d.maxMp,
    totalSR: 0, walletSR: 0, lives: 3, statuses: [],
  };
}

export const refreshCaps = ch => {
  const d = derive(ch);
  return { ...ch, hp: Math.min(ch.hp, d.maxHp), mp: Math.min(ch.mp, d.maxMp) };
};

export { MAX_ATTRIBUTE };
