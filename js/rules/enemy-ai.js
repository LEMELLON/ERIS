import { BALANCE } from '../data/balance.js';

export const hexDistance = (a, b) => {
  const dq = a.q - b.q, dr = a.r - b.r;
  return (Math.abs(dq) + Math.abs(dr) + Math.abs(dq + dr)) / 2;
};

// Nearest living target; ties broken by lowest index so results are deterministic.
export function nearestTarget(enemy, targets) {
  let best = null, bestD = Infinity;
  targets.forEach((t, i) => {
    if (t.hp <= 0) return;
    const d = hexDistance(enemy.pos, t.pos);
    if (d < bestD) { best = i; bestD = d; }
  });
  return best === null ? null : { index: best, distance: bestD };
}

// GDD d6: 1-3 basic attack, 4-5 elemental skill, 6 ultimate/desperation.
export function chooseAction(roller) {
  const r = roller.roll(6, 'Enemy behaviour');
  const b = BALANCE.enemyBehaviour;
  const action = r >= b.ultimate[0] ? 'ultimate' : r >= b.skill[0] ? 'skill' : 'basic';
  return { roll: r, action };
}

// Leash: enemies drop aggro when the target is further than leash tiles.
export const withinLeash = (enemy, target, leash = 8) => hexDistance(enemy.pos, target.pos) <= leash;
