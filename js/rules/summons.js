import { BALANCE } from '../data/balance.js';

// Gana summon tokens: 1 HP, absorb a whole damaging instance (no overflow), last 3 turns.
export const createSummon = (owner, pos) => ({
  owner: owner.name, hp: BALANCE.summon.hp, turns: BALANCE.summon.turns,
  moveTiles: BALANCE.summon.moveTiles, int: owner.attrs.INT, pos,
});

// Returns the damage that still reaches the protected character (always 0 if a summon absorbs it).
export function absorbHit(summons, damage) {
  if (!summons.length || damage <= 0) return { summons, damageTaken: damage, absorbed: false };
  const [, ...rest] = summons;
  return { summons: rest, damageTaken: 0, absorbed: true };
}

export const tickSummons = summons =>
  summons.map(s => ({ ...s, turns: s.turns - 1 })).filter(s => s.turns > 0 && s.hp > 0);

// Blood Covenant: -15 HP -> +30 MP (capped at maxMp).
export function bloodCovenant(ch, maxMp) {
  if (ch.hp <= 15) return { ok: false, ch };
  return { ok: true, ch: { ...ch, hp: ch.hp - 15, mp: Math.min(maxMp, ch.mp + 30) } };
}
