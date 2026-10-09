// GDD "Arcana progression". Basic = Lv1 (0 MP), skills Lv3/5/7, ultimate Lv10 (once per boss encounter).
// `effect` is descriptive text; mechanical hooks (range, area, dot) are filled in as each effect is implemented.
// NOTE: the GDD gives Cana's basic attack as 2d6 + STR (probably a typo for AGI); change attackAttr to switch.
export const ABILITIES = {
  Cana: {
    attackAttr: 'STR',
    list: [
      { lv: 1,  name: 'Precision Shot',   cost: 0,  range: 4, effect: 'Arrow up to 4 tiles. 2d6 + STR + Proficiency vs Defense.' },
      { lv: 3,  name: 'Vaulting Retreat', cost: 5,  move: 3, effect: 'Reposition up to 3 tiles without reaction attacks. Next physical attack +2.' },
      { lv: 5,  name: 'Elemental Volley', cost: 10, dot: true, effect: 'Element-infused shot: base damage plus the element DoT.' },
      { lv: 7,  name: 'Caltrop Trap',     cost: 10, effect: 'Invisible trap on an adjacent hex. First enemy to step on it takes physical damage and is rooted one turn.' },
      { lv: 10, name: 'Apex Predator',    cost: 30, ultimate: true, radius: 3, dot: true, effect: 'Barrage over 3-tile radius, pulls small/medium enemies to the center, applies DoT to all.' },
    ],
  },
  Bhana: {
    attackAttr: 'STR',
    list: [
      { lv: 1,  name: 'Heavy Cleave',       cost: 0,  range: 1, effect: 'Melee strike on 1 adjacent hex. 2d6 + STR + Proficiency.' },
      { lv: 3,  name: 'Vanguard Shield',    cost: 5,  effect: 'Temporary HP equal to VIT x 3 for the encounter.' },
      { lv: 5,  name: 'Elemental Smash',    cost: 10, line: 3, dot: true, effect: 'Shockwave in a 3-hex line. Physical damage plus the element DoT.' },
      { lv: 7,  name: 'Intimidating Stomp', cost: 15, effect: 'AoE on all adjacent hexes. Surrounding enemies Speed becomes 0 next turn.' },
      { lv: 10, name: 'Colossus Execution', cost: 30, ultimate: true, effect: 'Single target. On hit, destroys base Defense for the battle and applies double-strength DoT.' },
    ],
  },
  Prana: {
    attackAttr: 'INT',
    list: [
      { lv: 1,  name: 'Arcane Bolt',    cost: 0,  range: 3, effect: 'Magical projectile up to 3 tiles. 2d6 + INT + Proficiency.' },
      { lv: 3,  name: 'Phase Step',     cost: 10, move: 2, effect: 'Teleport to an unoccupied hex within 2 tiles; light magic damage to hexes adjacent to the landing spot.' },
      { lv: 5,  name: 'Elemental Blast',cost: 15, range: 3, dot: true, effect: 'Engulf a target within 3 tiles, applying the element DoT.' },
      { lv: 7,  name: 'Mana Barrier',   cost: 15, effect: '3-hex barrier. Enemies passing take heavy INT damage and have 50% chance to gain the DoT.' },
      { lv: 10, name: 'Cataclysm',      cost: 35, ultimate: true, radius: 2, effect: 'Anomaly on a target hex, catastrophic damage in 2-tile radius, hazard tiles for 3 turns.' },
    ],
  },
  Gana: {
    attackAttr: 'INT',
    list: [
      { lv: 1,  name: 'Soul Ray',          cost: 0,  range: 3, effect: 'Spiritual blast up to 3 tiles. 2d6 + INT + Proficiency.' },
      { lv: 3,  name: 'Call Familiar',     cost: 10, summon: true, effect: 'Beast token on an adjacent hex. Inherits your element, own initiative, 1 tile movement, attacks with your INT, lasts 3 turns.' },
      { lv: 5,  name: 'Elemental Command',cost: 15, dot: true, effect: 'Active summon releases a pulse hitting all adjacent enemies and applying the DoT.' },
      { lv: 7,  name: 'Blood Covenant',    cost: 0,  effect: 'Sacrifice 15 HP to restore 30 MP, or make an active summon attack twice this turn.' },
      { lv: 10, name: 'Legion’s Wrath', cost: 40, ultimate: true, radius: 4, dot: true, effect: 'Vortex pulls all enemies within 4 tiles to the center. Massive magic damage plus DoT.' },
    ],
  },
};
