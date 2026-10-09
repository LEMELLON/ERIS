// Guardians, key fragments and the Aion fight (GDD "Endgame").
export const FRAGMENTS_NEEDED = 4; // GM-configurable for shorter matches

export const defeatGuardian = (fragments, biome) =>
  fragments.includes(biome) ? fragments : [...fragments, biome];

export const hasEternalKey = (fragments, needed = FRAGMENTS_NEEDED) => new Set(fragments).size >= needed;

// damageByPlayer: { name: damageDealtLastRound }. Aion targets the top damage dealer;
// no damage last round -> no aggro target. Ties go to the first name (stable); GM may override.
export function aionTarget(damageByPlayer) {
  let best = null, bestDmg = 0;
  for (const [name, dmg] of Object.entries(damageByPlayer)) if (dmg > bestDmg) { best = name; bestDmg = dmg; }
  return best;
}

// PLACEHOLDER attack table (GDD gives none): the averaged d20 picks one of four bands.
export const AION_ATTACKS = [
  { max: 5,  name: 'Aion attack 1 (PLACEHOLDER)' },
  { max: 10, name: 'Aion attack 2 (PLACEHOLDER)' },
  { max: 15, name: 'Aion attack 3 (PLACEHOLDER)' },
  { max: 20, name: 'Aion attack 4 (PLACEHOLDER)' },
];

// Every living player rolls a d20; the average (rounded) picks the area attack.
export function aionAreaAttack(roller, playerCount) {
  const rolls = [];
  for (let i = 0; i < playerCount; i++) rolls.push(roller.roll(20, `Aion area roll ${i + 1}`, 'aion'));
  const average = Math.round(rolls.reduce((a, b) => a + b, 0) / rolls.length);
  return { rolls, average, attack: AION_ATTACKS.find(a => average <= a.max) };
}

// Whoever lands the hit that takes Aion to 0 HP wins Athanasia.
export function hitAion(aion, attacker, damage) {
  const hp = Math.max(0, aion.hp - damage);
  return { aion: { ...aion, hp }, winner: hp === 0 && aion.hp > 0 ? attacker : null };
}
