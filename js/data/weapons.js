// GDD section 8: class-specific weapon drops. Per biome, rows = easy, medium, hard, guardian;
// columns = Cana (Ranger), Bhana (Warrior), Prana (Mage), Gana (Summoner). "Name|draft effect".
// Effects are draft text and are NOT mechanically implemented yet. Numbers (damage) come from BALANCE.rarityDie.
// The separate subclass weapon tiers (Bronze..Mythic) conflict with these tables (handoff 10.4) and are not encoded.
export const CLASSES = ['Cana', 'Bhana', 'Prana', 'Gana'];
export const TIERS = ['easy', 'medium', 'hard', 'guardian'];

const RAW = {
  pyria: [
    ['Ember Shortbow|arrows leave a brief burn', 'Spark Cleaver|strikes throw small sparks', 'Cinder Wand|fires small fire bolts', 'Imp Ember Charm|slightly boosts fire summon damage'],
    ['Sprite Flame Bow|arrows track nearby targets', 'Flarebrand Sword|burning strikes', 'Pyre Rod|casts tracking fireballs', 'Sprite Lantern|boosts fire summon damage'],
    ['Phlox Bloom Bow|arrows leave lingering flame clouds', 'Phlox Thorn Blade|hits leave small flame clouds', 'Blossomflame Staff|spells burst into flame petals', 'Petalfire Censer|summons leave flame clouds when defeated'],
    ['Forgefire Longbow|molten arrows pierce and burn', 'Anvil of Hephaestus|hammer slams create lava shockwaves', 'Volcanic Scepter|spells trigger lava eruptions', 'Forgeheart Codex|summons a forge golem'],
  ],
  geia: [
    ['Pebble Sling|shots have a small chance to stagger', 'Stone Cudgel|small chance to stagger enemies', 'Rubble Wand|fires small stone shards', 'Pebble Charm|summons last slightly longer'],
    ['Gnome Slingshot|mud shots slow enemies', 'Mudpacked Hammer|hits slow enemies', 'Clay Scepter|spells slow targets', 'Gnome Digging Bell|summons slow nearby enemies'],
    ['Wormtooth Crossbow|bolts pull enemies slightly closer', 'Burrowfang Greataxe|attacks pull enemies toward you', 'Burrow Staff|spells erupt from beneath the target', 'Chthonic Totem|summons burst from the ground'],
    ['Gaia’s Verdant Longbow|arrows sprout vines that root enemies', 'Earthbreaker Maul|slams open damaging fissures', 'Tectonic Staff|spells trigger rock spikes', 'Titan Seed Tome|summons a stone titan'],
  ],
  hydoria: [
    ['Bubblestring Bow|arrows pop into small bubbles', 'Slime Mace|hits splash nearby enemies', 'Drizzle Wand|water bolts with slight splash', 'Bubble Charm|summons release bubbles when defeated'],
    ['Jellysting Bow|arrows shock on hit', 'Jellyspike Trident|shocks on contact', 'Stormjelly Rod|spells release electrical bursts', 'Mistbell Charm|summons gain a small shock aura'],
    ['Naiad’s Tidebow|arrows trap enemies in bubbles', 'Naiad Wavecutter|strikes send out a water wave', 'Torrent Staff|channels a water torrent', 'Bubble Sphere Orb|summons gain a bubble shield'],
    ['Encircling Current Bow|arrows curve and return to hit again', 'Whirlpool Greatblade|spins to create a whirlpool', 'Tidal Scepter|spells trigger high-tide surges', 'Tome of the Encircling River|summons a tidal guardian'],
  ],
  aeria: [
    ['Hawkeye Shortbow|bonus damage at long range', 'Talon Blade|quick dash slash', 'Hawkfeather Wand|quick wind bolts', 'Gale Feather Charm|boosts summon speed'],
    ['Swallowwing Bow|fires multiple arrows in a spread', 'Skyslash Blade|attacks hit in a wide arc', 'Swallowtail Wand|casts multiple small bolts', 'Swarmcall Whistle|summons attack in swarms'],
    ['Thunderstring Bow|arrows carry lightning', 'Stormfang Hammer|hits discharge lightning around you', 'Thunderspark Staff|spells chain lightning', 'Cub’s Roar Horn|summons discharge lightning'],
    ['Windkeeper’s Longbow|arrows push enemies back', 'Gale Splitter|slashes send out knockback wind shears', 'Tempest Scepter|spells create violent gusts', 'Skybound Tome|summons a wind spirit'],
  ],
  phosia: [
    ['Glimmer Bow|arrows briefly blind enemies', 'Dawnsteel Sword|small healing on hit', 'Glimmer Wand|fires small radiant beams', 'Glimmer Charm|summons flash and briefly blind enemies when called'],
    ['Haloshot Bow|arrows give a small shield to allies hit', 'Halo Blade|blocking creates a small barrier', 'Haloglass Staff|spells shield nearby allies', 'Sentinel’s Sigil|summons gain a protective barrier'],
    ['Mirrorshot Bow|echoes your last shot', 'Reflection Blade|reflects a portion of damage', 'Mirror Staff|sometimes repeats your last spell', 'Wraith Mirror Orb|summons copy a portion of your buffs'],
    ['Sunbeam Longbow|arrows fire holy beams', 'Helios Blade|slashes release solar bursts', 'Solar Lyre Staff|spells create harmonic shockwaves', 'Sunchariot Tome|summons a blazing sun spirit'],
  ],
  skotosia: [
    ['Duskwing Bow|bonus damage from stealth', 'Fang Dagger|hits cause minor bleeding', 'Dusk Wand|fires small dark bolts', 'Batfang Charm|summons gain minor lifesteal'],
    ['Stalker’s Shortbow|bonus damage against targets not facing you', 'Stalker’s Dagger Blade|bonus damage when hitting from behind', 'Shadowthread Wand|spells apply damage over time', 'Stalker Fang Totem|summons ambush from behind'],
    ['Umbral Longbow|arrows phase through enemy shields', 'Umbral Fang Blade|strikes ignore a portion of defense', 'Umbral Rod|spells pass through barriers', 'Houndmaster’s Whistle|summons phase through attacks briefly'],
    ['Nightfall Bow|arrows darken enemy vision', 'Nyx’s Voidreaper|lifesteal strikes in the dark', 'Staff of Endless Night|casts void fields that drain enemy health', 'Tome of the Starless Sky|summons a shadow of the night'],
  ],
};

const parse = s => { const [name, effect] = s.split('|'); return { name, effect }; };
export const WEAPONS = Object.fromEntries(Object.entries(RAW).map(([biome, rows]) => [biome,
  Object.fromEntries(TIERS.map((tier, i) => [tier,
    Object.fromEntries(CLASSES.map((cls, j) => [cls, parse(rows[i][j])]))]))]));

export const weaponFor = (biome, tier, cls) => WEAPONS[biome][tier][cls];
