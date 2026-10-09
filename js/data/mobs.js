// GDD section 7: 6 biomes x 3 tiers = 18 mobs, plus 6 guardians. Phosia/Skotosia are hidden realms (not on the 4-biome board).
// CR per tier is a PLACEHOLDER (GDD gives no CR for specific mobs or any CR -> stat mapping beyond SR).
export const TIER_CR = { easy: 1, medium: 4, hard: 8, guardian: 12 }; // PLACEHOLDER
export const TIER_LOOT = { easy: 'common', medium: 'uncommon', hard: 'rare', guardian: 'legendary' };

export const BIOMES = {
  pyria:    { name: 'Pyria',    element: 'fire',  guardian: 'Hephaestus', onBoard: true },
  hydoria:  { name: 'Hydoria',  element: 'water', guardian: 'Oceanus',    onBoard: true },
  aeria:    { name: 'Aeria',    element: 'air',   guardian: 'Aeolus',     onBoard: true },
  geia:     { name: 'Geia',     element: 'earth', guardian: 'Gaia',       onBoard: true },
  phosia:   { name: 'Phosia',   element: 'light', guardian: 'Apollo',     onBoard: false },
  skotosia: { name: 'Skotosia', element: 'dark',  guardian: 'Nyx',        onBoard: false },
};

export const MOBS = {
  pyria:    { easy: 'Ember Imp',     medium: 'Pyre Sprite',    hard: 'Phlox Elemental' },
  geia:     { easy: 'Pebble Golem',  medium: 'Clay Gnome',     hard: 'Chthonic Worm' },
  hydoria:  { easy: 'Bubble Slime',  medium: 'Mist Jellyfish', hard: 'Spring Naiad' },
  aeria:    { easy: 'Feather Hawk',  medium: 'Storm Swallow',  hard: 'Thunder Cub' },
  phosia:   { easy: 'Glimmer Sprite',medium: 'Halo Sentinel',  hard: 'Mirror Wraith' },
  skotosia: { easy: 'Dusk Bat',      medium: 'Night Stalker',  hard: 'Umbral Hound' },
};

export function createMob(biome, tier, pos = { q: 0, r: 0 }) {
  const b = BIOMES[biome];
  const name = tier === 'guardian' ? b.guardian : MOBS[biome][tier];
  return { name, biome, tier, cr: TIER_CR[tier], element: b.element, lootRarity: TIER_LOOT[tier], pos };
}
