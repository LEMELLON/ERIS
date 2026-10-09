// GDD "Armor". Two overlapping lists exist (handoff 10.10): all-biome Common/Uncommon + biome Rare/Legendary,
// and per-mob armor. Both are encoded; `armorDrop()` uses the per-mob list by default (set USE_MOB_ARMOR=false to use the other).
import { CLASSES, TIERS } from './weapons.js';
export const USE_MOB_ARMOR = true;

// All-biome Common / Uncommon (adds Physical Defense). Columns: Cana, Bhana, Prana, Gana.
export const BASE_ARMOR = {
  common:   { Cana: 'Leather Tunic',    Bhana: 'Leather Armor',    Prana: 'Leather Robe', Gana: 'Leather Shroud' },
  uncommon: { Cana: 'Huntsman Chiton',  Bhana: 'Myrmidon Cuirass', Prana: 'Pythia’s Robe', Gana: 'Orphic Shroud' },
};

const split = s => { const [name, passive] = s.split('|'); return { name, passive: passive || null }; };
const mapRow = row => Object.fromEntries(CLASSES.map((c, i) => [c, split(row[i])]));

// Rare / Legendary armor by biome. Passive null = "not yet defined" in the GDD.
// Columns here: Cana, Bhana, Prana, Gana.
export const BIOME_ARMOR = {
  pyria: {
    rare: mapRow(['Cinder Boots', 'Furnaceplate', 'Forgeweave Robes', 'Ashfall Shroud']),
    legendary: mapRow(['Emberforge Crown|increases AGI for every burning target', 'AmóniKardiá|burning aura, damages surrounding tiles every turn', 'Crucible Circlet|increases damage in the Fire biome', 'Bondforge Harness']),
  },
  geia: {
    rare: mapRow(['Rootveil Hood', 'Granite Helm', 'Rootbound Sandals', 'Granite Stonehorn']),
    legendary: mapRow(['Wildgrowth Vest|increases AGI in the Earth biome', 'Mountainplate|damage reduction and bonus HP', 'Primordial Robes|increases barrier strength', 'Primordial Mantle|increases Summon HP and VIT']),
  },
  hydoria: {
    rare: mapRow(['Riverstride Boots', 'Tideplate|resistance to debuffs', 'Ocean Circlet', 'Ocean Shroud']),
    legendary: mapRow(['Mistcowl', 'Deepsea Helm|immune to debuffs and regenerates HP every turn', 'Boundless Robes|increases MP and regenerates MP every turn', 'Riverhorn Crown']),
  },
  aeria: {
    rare: mapRow(['Skyglide Boots', 'Tempest Armor', 'Tempest Robe', 'Skyrend Cloak']),
    legendary: mapRow(['Anémoplegma|increases movement and AGI', 'Galecrest Helm|increases AGI', 'Stormcrown|increases cast speed', 'Windkeeper’s Shroud|increases summon AGI']),
  },
  phosia: {
    rare: mapRow(['Sunbrand Vest', 'Sunbrand Armor', 'Radiant Robe', 'Radiant Shroud']),
    legendary: mapRow(['Dawnarcher Hood', 'Dayspear Armor|reduces Dark damage', 'Oracle’s Diadem|increases healing spells', 'Solar Halo|increases barrier strength and buff duration']),
  },
  skotosia: {
    rare: mapRow(['Umbral Tunic', 'Nightfall Armor', 'Duskveil', 'Umbral Shroud']),
    legendary: mapRow(['Moonless Hood', 'Starless Armor|heals HP on every attack by damage dealt, lowers defense', 'Twilight Robes|steals mana for every enemy on a surrounding tile', 'Eventide Mantle|increases debuff chance']),
  },
};

// Per-mob armor. Rows easy, medium, hard, guardian; columns Cana, Bhana, Prana, Gana.
const MOB_RAW = {
  pyria: [
    ['Imp Hide Boots|slightly boosts movement speed', 'Ember Scale Vest|slightly reduces fire damage taken', 'Cinder Robe|slightly boosts mana regeneration', 'Imp Horn Amulet|summons gain slight fire resistance'],
    ['Sprite Wing Cloak|dodging leaves a brief fire trail', 'Flarebrand Breastplate|attackers take small burn damage', 'Pyre Sage Hat|fire spells cast faster', 'Lantern Bearer’s Mantle|summons slowly regenerate health'],
    ['Phlox Petal Leathers|dodging leaves a small flame cloud', 'Phlox Thorn Plate|releases a flame burst when hit', 'Blossomflame Vestments|immune to your own flame clouds, bonus fire damage', 'Petalfire Shroud|summons gain a flame aura'],
    ['Forgewalker Greaves|movement leaves lava trails that slow enemies', 'Anvilbound Plate|large damage reduction at low health', 'Volcanic Mantle|bonus fire damage and immunity to burn', 'Forgeheart Vestments|summons gain molten armor'],
  ],
  geia: [
    ['Pebble Hide Boots|slightly reduces knockback', 'Stone Plate Vest|slightly boosts defense', 'Rubble Robe|small chance to resist stagger while casting', 'Pebble Pendant|summons take slightly less damage'],
    ['Gnome Trapper’s Vest|traps last longer', 'Mudpacked Armor|reduces the effect of slows', 'Clay Hood|faster mana regeneration while standing still', 'Gnome Miner’s Lamp|summons move faster'],
    ['Wormskin Cloak|briefly gain stealth after dodging', 'Burrowfang Armor|immune to pulls and drags', 'Burrow Robe|casting while standing still grants a small shield', 'Chthonic Mantle|summons appear with a small shield'],
    ['Verdant Cloak|slowly regenerates health over time', 'Earthbreaker Plate|large damage reduction and immune to knockback', 'Tectonic Robe|a barrier periodically absorbs damage', 'Titan Seed Vestments|summons gain bonus health'],
  ],
  hydoria: [
    ['Bubble Skin Boots|slightly boosts dodge chance', 'Slime Gel Vest|reduces damage from the first hit', 'Drizzle Robe|slightly boosts mana regeneration', 'Bubble Pendant|defeated summons release a small heal'],
    ['Jellyfin Cloak|dodging shocks nearby enemies', 'Jellyspike Armor|attackers are shocked', 'Stormjelly Hood|resists lightning and casts faster', 'Mistbell Mantle|summons resist shock damage'],
    ['Naiad Veil Cloak|harder to target while moving', 'Naiad Scale Mail|a water shield absorbs damage', 'Torrent Vestments|bonus mana regeneration', 'Bubble Sphere Pendant|summons are shielded in a bubble when called'],
    ['Current Walker Boots|fast movement and bonus dodge', 'Whirlpool Plate|damage reduction when surrounded', 'Tidal Mantle|restores mana on kill', 'Robes of the Encircling River|summons heal over time'],
  ],
  aeria: [
    ['Hawkfeather Boots|slightly boosts movement speed', 'Talon Guard Vest|slightly faster dash recovery', 'Feather Hat|slightly faster casting', 'Gale Feather Pendant|summons move slightly faster'],
    ['Swallow Wing Cloak|small chance to dodge attacks', 'Skyslash Mail|reduces knockback', 'Swallowtail Robe|faster casting', 'Swarmcall Mantle|summons move faster in groups'],
    ['Thunder Pelt Cloak|dodging releases a small lightning strike', 'Stormfang Plate|discharges lightning when hit', 'Thunderspark Vestments|bonus lightning damage', 'Cub’s Roar Pendant|summons gain a lightning aura'],
    ['Windkeeper Cloak|short glide and immune to knockback', 'Gale Bastion Plate|immune to knockback and wind effects', 'Tempest Mantle|faster casting and movement', 'Skybound Vestments|summons gain flight speed and evasion'],
  ],
  phosia: [
    ['Glimmer Cloak|resists blinding effects', 'Dawnsteel Vest|small healing when hit', 'Glimmer Hood|slightly restores mana over time', 'Glimmer Pendant|summons are slightly harder to blind'],
    ['Haloshot Leathers|nearby allies gain a small shield', 'Halo Plate|bonus defense when allies are nearby', 'Haloglass Robe|casting grants a brief shield', 'Sentinel’s Mantle|summons gain a protective barrier'],
    ['Mirror Cloak|chance to reflect projectiles', 'Reflection Plate|reflects a portion of damage taken', 'Mirror Vestments|chance to echo a shield after casting', 'Wraith Mirror Pendant|summons reflect a portion of damage'],
    ['Sunbeam Cloak|bonus crit chance and resist blinding', 'Helios Plate|heals when you take damage in light', 'Solar Lyre Robes|spells cast faster and restore mana', 'Sunchariot Mantle|summons heal allies and gain bonus damage'],
  ],
  skotosia: [
    ['Duskwing Cloak|brief stealth after dodging', 'Fang Guard Vest|resists bleeding', 'Dusk Robe|resists mana drain', 'Batfang Pendant|summons gain minor lifesteal'],
    ['Stalker’s Hood|bonus damage from stealth', 'Stalker Plate|reduces damage from behind', 'Shadowthread Robe|damage over time spells last longer', 'Stalker Fang Mantle|summons gain bonus damage from behind'],
    ['Umbral Cloak|briefly phase through attacks after dodging', 'Umbral Fang Plate|briefly phase after being hit', 'Umbral Vestments|spells pass through barriers and resist curses', 'Houndmaster’s Pendant|summons phase through attacks briefly'],
    ['Nightfall Cloak|becomes invisible in darkness', 'Voidreaper Plate|lifesteal and damage reduction in the dark', 'Endless Night Robe|void fields drain enemy health faster', 'Mantle of the Starless Sky|summons gain lifesteal and shadow armor'],
  ],
};

export const MOB_ARMOR = Object.fromEntries(Object.entries(MOB_RAW).map(([biome, rows]) => [biome,
  Object.fromEntries(TIERS.map((tier, i) => [tier, mapRow(rows[i])]))]));

export const mobArmorFor = (biome, tier, cls) => MOB_ARMOR[biome][tier][cls];
