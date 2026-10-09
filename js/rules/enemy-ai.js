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

import { resolveAttack, applyDamage } from './combat.js';
import { absorbHit } from './summons.js';
import { derive } from './stats.js';

export const mobStats = cr => ({
  maxHp: BALANCE.mob.hp(cr), defense: BALANCE.mob.defense(cr),
  maxMp: BALANCE.mob.mp(cr), attackBonus: BALANCE.mob.attackBonus(cr),
});

// One full enemy turn against the nearest living player.
// basic -> attack; skill/ultimate -> returned as a `special` marker (signature mechanics are per-mob and not encoded yet);
// the special action still attacks so the loop never stalls (PLACEHOLDER: ultimate = +50% damage).
// targets: [{ ch, pos, summons? }]. Returns { action, roll, targetIndex, result, targets }.
export function enemyTurn(roller, enemy, targets) {
  const { roll, action } = chooseAction(roller);
  const near = nearestTarget(enemy, targets.map(t => ({ hp: t.ch.hp, pos: t.pos })));
  if (!near) return { action, roll, targetIndex: null, result: null, targets };
  const t = targets[near.index];
  const d = derive(t.ch);
  const atk = resolveAttack(roller,
    { attrMod: BALANCE.mob.attackBonus(enemy.cr), proficiency: 0, rarity: 'common', element: enemy.element },
    { defense: d.physDef, element: t.ch.element });
  let dmg = atk.hit ? atk.damage + BALANCE.mob.damageBonus(enemy.cr) : 0;
  if (action === 'ultimate') dmg = Math.floor(dmg * 1.5);
  const ab = absorbHit(t.summons || [], dmg);
  const ch = applyDamage(t.ch, ab.damageTaken);
  const next = targets.map((x, i) => i === near.index ? { ...x, ch, summons: ab.summons } : x);
  return { action, roll, targetIndex: near.index, result: { ...atk, damage: dmg, absorbed: ab.absorbed, hpAfter: ch.hp }, targets: next };
}
