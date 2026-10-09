// GDD consumables. The GDD keeps TWO lists (handoff 10.10). List 1 (below) is the one the rules use; list 2 is kept as text in LIST_2.
// Effects are structured where the GDD gives numbers. `rarity` is a PLACEHOLDER where the GDD does not state it.
export const CONSUMABLES = [
  { id: 'health_basic',   name: 'Basic Health Potion',   rarity: 'common',   effect: { hpPct: 15 } },
  { id: 'mana_basic',     name: 'Basic Mana Potion',     rarity: 'common',   effect: { mpPct: 15 } },
  { id: 'health_greater', name: 'Greater Health Potion', rarity: 'uncommon', effect: { hpPct: 35 } },
  { id: 'mana_greater',   name: 'Greater Mana Potion',   rarity: 'uncommon', effect: { mpPct: 35 } },
  { id: 'elixir',         name: 'Elixir',                rarity: 'rare',     effect: { hpPct: 15, mpPct: 15 } },
  { id: 'super_elixir',   name: 'Super Elixir',          rarity: 'legendary',effect: { hpPct: 35, mpPct: 35 } },

  { id: 'flame_salve',  name: 'Pŷrian Flame-Salve',  rarity: 'common',   effect: { fireDamage: 5, status: 'ignited', turns: 3 } },
  { id: 'frost_vial',   name: 'Hýdōrian Frost-Vial', rarity: 'common', effect: { slowTiles: 1, turns: 3 } },
  { id: 'stone_oil',    name: 'Gēian Stone-Oil',     rarity: 'common',   effect: { physDef: 3, knockbackImmune: true, turns: 3 } },
  { id: 'zephyr_dust',  name: 'Aerian Zephyr Dust',       rarity: 'common',   effect: { speedTiles: 1, turns: 2 } },

  { id: 'tonic_myrmidon', name: 'Tonic of the Myrmidon',  rarity: 'uncommon', effect: { attr: { STR: 3 } } },
  { id: 'hermes_draught', name: 'Hermes’ Winged Draught', rarity: 'uncommon', effect: { attr: { AGI: 3 }, initiative: 2 } },
  { id: 'atlas_endurance',name: 'Atlas’s Endurance', rarity: 'uncommon', effect: { maxHp: 20, turns: 3 } },
  { id: 'oracle_insight', name: 'Oracle’s Insight',   rarity: 'uncommon', effect: { attr: { INT: 3 } } },

  { id: 'anima_shard',     name: 'Anima Shard',      rarity: 'common',   effect: { bonusSR: 'PLACEHOLDER' } },
  { id: 'revival_token',   name: 'Revival Token',    rarity: 'rare',     effect: { revive: true } },
  { id: 'teleport_scroll', name: 'Teleport Scroll',  rarity: 'uncommon', effect: { teleportToCheckpoint: true } },
  { id: 'fragment_compass',name: 'Fragment Compass', rarity: 'rare',     effect: { pointsToFragment: true } },
  { id: 'lucky_coin',      name: 'Lucky Coin',       rarity: 'uncommon', effect: { nextDropBonus: 1 } },
];

export const LIST_2 = [
  'Minor/Healing/Greater Healing Draught, Ambrosia, Nectar of Olympus', 'Minor/Mana/Greater Mana Draught', 'Stamina Biscuit, Cleansing Herb, Panacea Tonic',
  'Might Tonic, Fortitude Elixir, Swiftness Tonic, Celerity Elixir, Aegis Salve, Bulwark Elixir, Arcana Tonic, Sophia Elixir',
  'Biome items (Ember Flask, Magma Bomb, Phlox Incense, Clay Poultice, ...) and class items (Hunter’s Arrow Bundle, Whetstone, Focus Crystal, Bind Rune, ...)',
];

export const byRarity = rarity => CONSUMABLES.filter(c => c.rarity === rarity);
