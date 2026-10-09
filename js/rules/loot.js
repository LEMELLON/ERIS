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

import { weaponFor } from '../data/weapons.js';
import { byRarity } from '../data/consumables.js';

const NEXT_TIER = { easy: 'medium', medium: 'hard' };

// Full drop for one defeated mob/guardian, for the killer's class.
// - Weapon: d20 vs tier threshold; a natural 20 on Common/Uncommon drops the next tier's weapon instead.
// - Consumables: guardians drop 2 Legendary; everything else drops >= 1 of its tier's rarity (quantity d20).
// Armor has no drop chance defined in the GDD, so it is not rolled here (see data/armor.js).
export function lootFor(roller, mob, cls) {
  const weaponRoll = rollWeaponDrop(roller, mob.tier, mob.lootRarity);
  let weapon = null;
  if (weaponRoll.dropped) {
    const tier = weaponRoll.upgraded ? NEXT_TIER[mob.tier] : mob.tier;
    weapon = { ...weaponFor(mob.biome, tier, cls), tier, rarity: weaponRoll.rarity, upgraded: weaponRoll.upgraded };
  }
  const pool = byRarity(mob.lootRarity);
  const count = mob.tier === 'guardian' ? 2 : rollConsumableQuantity(roller).quantity;
  const consumables = [];
  for (let i = 0; i < count; i++) consumables.push(pool[roller.roll(pool.length, 'Consumable pick', 'loot') - 1].id);
  return { weapon, consumables, weaponRoll: weaponRoll.roll };
}
