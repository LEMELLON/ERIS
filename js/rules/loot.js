import { BALANCE } from '../data/balance.js';

// Weapon drop: d20 >= threshold for the tier (Guardian needs a natural 20).
// A natural 20 upgrades Common/Uncommon by one rarity step. Weapon is for the killer's class.
export function rollWeaponDrop(roller, tier, rarity = 'common') {
  const r = roller.roll(20, 'Weapon drop', 'loot');
  const dropped = tier === 'guardian' ? r === 20 : r >= BALANCE.weaponDropThreshold[tier];
  if (!dropped) return { dropped: false, roll: r };
  const order = BALANCE.rarityOrder;
  let out = rarity;
  if (r === 20 && (rarity === 'common' || rarity === 'uncommon')) out = order[order.indexOf(rarity) + 1];
  return { dropped: true, roll: r, rarity: out, upgraded: out !== rarity };
}

// Consumable quantity d20: 1-10 -> 1, 11-19 -> 2, 20 -> 3. Every mob drops at least one.
export function rollConsumableQuantity(roller) {
  const r = roller.roll(20, 'Consumable quantity', 'loot');
  return { roll: r, quantity: r === 20 ? 3 : r >= 11 ? 2 : 1 };
}
