import { BALANCE } from '../data/balance.js';
import { elementMultiplier } from './elements.js';

// 2d6 + attribute mod + Proficiency >= Defense. Natural 12 = crit (ignores Defense), natural 2 = auto-miss.
export function attackRoll(roller, { attrMod, proficiency, defense }) {
  const d1 = roller.roll(6, 'Attack die 1', 'attack');
  const d2 = roller.roll(6, 'Attack die 2', 'attack');
  const natural = d1 + d2;
  const total = natural + attrMod + proficiency;
  const crit = natural === 12;
  const autoMiss = natural === 2;
  const hit = crit || (!autoMiss && total >= defense);
  return { dice: [d1, d2], natural, total, defense, crit, autoMiss, hit };
}

// Damage = weapon die + attribute mod (min 1), x2 on crit, x element multiplier, floored, min 1.
export function rollDamage(roller, { rarity = 'common', attrMod = 0, crit = false, attackElement, defendElement }) {
  const die = BALANCE.rarityDie[rarity];
  const rolled = roller.roll(die, 'Damage', 'damage');
  let dmg = Math.max(1, rolled + attrMod);
  if (crit) dmg *= 2;
  const mult = attackElement && defendElement ? elementMultiplier(attackElement, defendElement) : 1;
  return { rolled, multiplier: mult, damage: Math.max(1, Math.floor(dmg * mult)) };
}

export function resolveAttack(roller, atk, def) {
  const hit = attackRoll(roller, { attrMod: atk.attrMod, proficiency: atk.proficiency, defense: def.defense });
  if (!hit.hit) return { ...hit, damage: 0 };
  const dmg = rollDamage(roller, { rarity: atk.rarity, attrMod: atk.attrMod, crit: hit.crit,
    attackElement: atk.element, defendElement: def.element });
  return { ...hit, ...dmg };
}

export const applyDamage = (target, amount) => ({ ...target, hp: Math.max(0, target.hp - amount) });
export const isDown = t => t.hp <= 0;
