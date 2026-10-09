// Every tunable number lives here. ALL values marked PLACEHOLDER are undefined in the GDD
// (handoff section 10) and exist only so the rules code can run. Edit freely.
export const BALANCE = {
  // PLACEHOLDER mob scaling (handoff 10.1)
  mob: {
    hp: cr => 15 + 8 * cr,
    defense: cr => 6 + Math.floor(cr / 2),
    damageDie: 6,
    damageBonus: cr => cr,
    mp: cr => 10 + 5 * cr,
  },
  // GDD: Mob SR = min(10*CR, 3*CR+21, CR+41)
  mobSR: cr => Math.min(10 * cr, 3 * cr + 21, cr + 41),
  // PLACEHOLDER weapon damage die by rarity (handoff 10.2)
  rarityDie: { common: 6, uncommon: 8, rare: 10, legendary: 12 },
  rarityOrder: ['common', 'uncommon', 'rare', 'legendary'],
  // GDD loot thresholds (d20 >= value; guardian needs exactly 20)
  weaponDropThreshold: { easy: 11, medium: 14, hard: 17, guardian: 20 },
  // PLACEHOLDER lives
  lives: { start: 3, walletLossFraction: 0.25 },
  // PLACEHOLDER status effects (GDD names them but gives no numbers)
  statuses: {
    ignited:   { turns: 3, dot: 2 },
    drenched:  { turns: 3, dot: 0 },
    splintered:{ turns: 3, dot: 2 },
    windswept: { turns: 2, dot: 0 },
  },
  summon: { hp: 1, turns: 3, moveTiles: 1 },
  // GDD enemy d6 table
  enemyBehaviour: { basic: [1, 3], skill: [4, 5], ultimate: [6, 6] },
};
