import { BALANCE } from '../data/balance.js';

// Statuses are plain {type, turns, dot}. Numbers come from BALANCE.statuses (placeholders).
export function applyStatus(target, type) {
  const def = BALANCE.statuses[type];
  if (!def) throw new Error('Unknown status: ' + type);
  const others = target.statuses.filter(s => s.type !== type); // re-applying refreshes
  return { ...target, statuses: [...others, { type, turns: def.turns, dot: def.dot }] };
}

// Call at the start of the target's turn.
export function tickStatuses(target) {
  const dmg = target.statuses.reduce((n, s) => n + s.dot, 0);
  const statuses = target.statuses.map(s => ({ ...s, turns: s.turns - 1 })).filter(s => s.turns > 0);
  return { target: { ...target, hp: Math.max(0, target.hp - dmg), statuses }, damage: dmg };
}
