# Arcana Resonatia — Guide Book (v7)

*Competitive same-board race game, 2–6 players. Win: land the killing blow on the Boss.*
*Every rule below can be resolved with physical dice and simple arithmetic.*

---

## 0. Dice Toolkit

| Notation | Meaning |
|---|---|
| dN | one N-sided die (d4 d6 d8 d10 d12 d20) |
| 2d6 | two d6 summed. **Double** = both faces equal |
| Rolling for a number that isn't a die size | Roll the smallest die that is at least that big and reroll anything over. Above 20, roll two d10 as a percentile, divide by the number and use the remainder (a remainder of zero counts as the highest option) |
| Rounding | Always round down, toward the lower number (−4.5 becomes −5) |
| Advantage on damage | roll the whole damage formula twice, keep the higher |

**Element Die (d8):** 1 Aquis · 2 Pyris · 3 Aero · 4 Litho · 5 Fulgo · 6 Luxis · 7 Noctis · 8 **Wild** (player picks; for world/mob/boss elements, reroll).

---

## 1. Stats & Modifiers

Six stats: STR, CON, DEX, INT, WIS, CHAR. Range 0–20. **Modifier = (Stat − 10) ÷ 2, rounded down.**

| Stat | 0–1 | 2–3 | 4–5 | 6–7 | 8–9 | 10–11 | 12–13 | 14–15 | 16–17 | 18–19 | 20 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Mod | −5 | −4 | −3 | −2 | −1 | 0 | +1 | +2 | +3 | +4 | +5 |

- **STR** melee accuracy/damage · **CON** HP · **DEX** defense, speed, turn order, ranged accuracy/damage · **INT** Arcana (Cana, Bhana) · **WIS** Prana, perception · **CHAR** NPC/persuasion (DM-adjudicated).
- **Specialized stats (temporary):** Range (R→) and Armor Class (AC). Elements consumed may boost them for a duration; no upper cap.
- Gear penalties (−DEX/−CON) subtract from the **stat value**, floor 0, then recompute the modifier.

**Derived values**

| Value | Formula |
|---|---|
| Max HP | 20 + 4×CON + 5×(Level − 1). On change, current HP shifts by the same delta |
| Defense Value (DV) | DEX mod + total AC (armor + shield) |
| Speed Modifier | (your DEX modifier, or 0 if it is negative) × 2 ÷ 5, rounded down |
| Proficiency Bonus (PB) | Level table (§12) |

---

## 2. Character Creation (all dice/hand)

1. **Stats:** all six start at 1.
2. **Class** (table below) adds its modifiers to stat values (floor 0).
3. **Innate Affinity:** roll the Element Die (8 = choose). **Roll this for every player before the map is built** — Spawns depend on it (§10.6). Your Affinity is your *defending element* for trait checks, and you start with 1 Counter of it.
4. **Starting kit:** weapon = roll d8 on the Weapon list (§3 gear list order 1–8) — *or, if the GM allows it, the player simply chooses one*; defense = roll d6: 1–2 nothing, 3 Small Shield, 4 Light Armor, 5 Medium Shield, 6 Medium Armor.
5. SR = 0 → Level 1. HP per §1. Place on your Spawn tile (§10).

| Class | Stat Mods | Move Die | Extra |
|---|---|---|---|
| Rogue | +2 DEX, −1 CON | d8 | Fast striker, lowest HP |
| Fighter | +2 STR, +1 CON | d6 | Best 1v1 duelist |
| Mage | +2 INT, −1 STR | d6 | +1 Skill Pick at Levels 1, 9, 17 (§6.5) |

Subclass builds are flavor only: Assassin/Ranger (Rogue), Tank/Duelist (Fighter), Elementalist/Summoner (Mage).

---

## 3. Equipment

**Gear list (roll d14 for random gear):** 1 Fist/Short Sword/Dagger · 2 Hand-and-a-Half/Long Sword/Short Spear/Rapier/Club · 3 Pole Arm/Great Sword · 4 Long Bow · 5 Short Bow · 6 Recurve Bow · 7 Wand/Tome · 8 Staff · 9 Small Shield/Buckler · 10 Medium Shield · 11 Large Shield · 12 Light Armor · 13 Medium Armor · 14 Heavy Armor.

### Weapons
| Weapon Class | Range | Types | Notes |
|---|---|---|---|
| Fist / Short Sword / Dagger | 0 tiles | Knuckle Dusters, Bare-Hands, knives, machete | PvE: can attack twice, with a roll-based third attack. |
| Hand-and-a-Half Sword / Long Sword / Short Spear / Rapier / Club | 1 tile | Swords, half / broken spears | PvE: can only attack once, unless dual-wielded for a second, roll-based attack. |
| Pole Arm / Great Sword | 2 tiles | Spears, halberds | PvE: can attack only once. Constitution penalty of −2 CON. |
| Long Bow | 3rd–5th tile | Long bow | — |
| Short Bow | 2nd–4th tile | Short bow | — |
| Recurve Bow | 3 tiles | Recurve bows | Able to shoot twice. |
| Wand / Tome | 2 tiles | Sticks | — |
| Staff | 4 tiles | Long sticks | — |

*Extra attacks:* "roll-based" extra attack = roll d6 at the start of your Action, 4+ grants it. PvP: weapons attack once per Action (Recurve: twice).
*Accuracy/damage stat:* STR (melee), DEX (finesse/ranged), INT (Cana/Bhana), WIS (Prana).

### Shields
| Shield | Base AC | Dexterity Penalty |
|---|---|---|
| Small Shield / Buckler | 1 | 0 DEX |
| Medium Shield | 2 | −1 DEX |
| Large Shield | 3 | −2 DEX |

### Armor
| Armor | Base AC | Dexterity Penalty |
|---|---|---|
| Light Armor | 1 | — |
| Medium Armor | 2 | −1 DEX |
| Heavy Armor | 2 | −2 DEX |

---

## 4. Turn Structure & Movement

1. **Round start:** everyone rolls **d20 + DEX mod** (initiative), highest acts first for the whole round. Tie → higher DEX stat → reroll.
2. **Turn:** Movement + one **Action** (attack, Arcana skill, open chest, Channel, Rest, Enter/Withdraw portal, Unlock Boss, use Shrine). Movement may be split around the Action.
3. **Movement = class Move Die + Speed Modifier, minimum 2 tiles.** (Reconciles the old "2 tiles base" with the class move die.)
4. **Slipstream:** start your turn on a rival's tile → +1. **Speed Burn:** burn 1 SR or 1 Counter → +1.
5. **Channel (Action):** roll Element Die → gain 1 Counter of that element (max 4 Counters total; excess lost).
6. **Rest (Action, no movement):** heal 1d6 + PB.
7. **Retreat check:** 2d6 + DEX mod ≥ 7 → you may move away up to your movement; fail → the Action is lost.
8. **Enter Mob tile:** combat starts; defeat it or pass a Retreat check. A defeated Mob tile becomes Path.
9. **Obstacle tile:** pay 2 extra movement **or** roll a check: 2d6 + mod ≥ 7 + (Depth ÷ 2, rounded down). Type d6: 1–2 Rubble (STR) · 3–4 Bramble/Water (DEX) · 5 Ward (INT) · 6 Chasm (WIS). Fail → stop on the previous tile.
10. **Wall:** impassable, blocks line of sight.

---

## 5. Combat

### 5.1 Hit Roll (PvP only)
**Hit Total = 2d6. No modifiers** — no Accuracy mod, no PB, no DV.
**7 or higher = HIT.** Below 7 = miss.
**Critical Swing:** any double on the attacker's 2d6 auto-hits (even below 7) and the damage roll has Advantage.
**PvE (Mobs, Mini-Bosses, Boss): no hit roll.** Attacks in either direction always hit; go straight to the damage roll (§5.2). There is no Critical Swing in PvE.
Aero's *Gale* sets target's AC contribution to 0.

### 5.2 Damage Roll
On a hit: **1d20 + stat mod** (STR melee / DEX ranged / INT Cana / WIS Prana), then traits (§5.3), minimum 0, subtract from HP. HP 0 = defeated.
Arcana formulas: see §6.3.

### 5.3 Trait Computation (Advantage / Disadvantage / Resistance / Vulnerability)
Attacker's **attack element** vs defender's **defending element** (Affinity, or a Bhana-infused element while active). No element on either side → no trait.

**Resolution order**
1. **Raw** = damage formula (+ any bonus dice from Buffs).
2. **Flat step:** Advantage **+1**, Disadvantage **−1** (a flat 1). They cancel if both apply.
3. **Multiplier step:** Resistance **÷2 (rounded down)**, Vulnerability **×2**. They cancel if both apply. Identical multipliers never stack.
4. **Floor at 0.**
5. **Advantage side-effects:** attacker refunds 1 Counter of the element spent, and the target makes a Status Check (§5.4).

**Trait matrix (row = attacker element, column = defender element)**

| Atk \ Def | Aquis | Pyris | Aero | Litho | Fulgo | Luxis | Noctis |
|---|---|---|---|---|---|---|---|
| **Aquis** | — | ADV | — | — | DIS | — | — |
| **Pyris** | DIS | — | ADV | — | — | — | — |
| **Aero** | — | DIS | — | ADV | — | — | — |
| **Litho** | — | — | DIS | — | ADV | — | — |
| **Fulgo** | ADV | — | — | DIS | — | — | — |
| **Luxis** | — | — | — | — | — | RES | VULN |
| **Noctis** | — | — | — | — | — | VULN | RES |

Ring: Aquis > Pyris > Aero > Litho > Fulgo > Aquis. Twins trigger no Status Check.

**Worked examples**
- Mage (INT 3, mod −4) Cana with Pyris vs Aero-affinity target: raw = d20(15) + 2×(−4) = 7 → ADV +1 = **8**; refund 1 Pyris Counter; target rolls Status Check.
- Luxis Cana, raw 14 vs Noctis target: VULN → 14×2 = **28**. vs Luxis target: RES → 14 ÷ 2 = **7**.
- Raw 9 Aquis attack vs Fulgo target: DIS → **8**.
- Target has Resonant Guard (RES) and is hit by Luxis vs Noctis (VULN) → cancel → raw unchanged.

### 5.4 Status Effects
**Status Check:** target rolls 2d6 + CON mod; it resists if total ≥ **7 + attacker's PB**. Same status doesn't stack; reapplying rerolls duration and keeps the higher. Durations count full rounds. DoT ignores AC and traits.

| Element | Status | Category | Effect | Duration |
|---|---|---|---|---|
| Aquis | Chill | Debuff | −1 movement, −1 to damage rolls | 1d2 rounds |
| Pyris | Burn | Ailment (DoT) | 1d6 damage at start of target's turn | 1d3 rounds |
| Aero | Gale | Impairment | Armor and shield AC count as 0 | 1 round |
| Litho | Stagger | Impairment | Lose 1 Counter now (target's choice); can't Channel | 1 round |
| Fulgo | Chain Shock | Ailment (DoT) | 1d4 damage at turn start; each tick roll d6, on 6 it jumps to a random adjacent/same-tile creature | 1d3 rounds |
| Luxis | Radiant Infusion | Buff (self, via Bhana) | +1d6 damage on hits vs Noctis-affinity targets | 1d4 rounds |
| Noctis | Umbral Infusion | Buff (self, via Bhana) | +1d6 damage on hits vs Luxis-affinity targets | 1d4 rounds |

---

## 6. Arcana

### 6.1 Elements
Core 5 ring (§5.3) + Twin Forces Luxis/Noctis (mutual VULN, self RES). A player may hold up to **4 Counters** total, each tagged with an element.

### 6.2 Counters
- **Gain:** +1 of the mob's element per mob killed; Channel action (§4.5); Chests; Affinity start Counter.
- **Spend:** skills cost Counters of the chosen element. **Affinity discount:** your first skill each turn using your Affinity element costs 1 less (min 1).
- Skill costs below already include Prana's +1.

### 6.3 Application Formulas
| Type | Formula | Base Range | Notes |
|---|---|---|---|
| Cana (Magic) | 1d20 + 2×INT mod | 3 | Direct conjured damage |
| Bhana (Aura) | weapon damage roll + INT mod (flat) | 0 (self/weapon) | Augments attacks; infuses element |
| Prana (Divinity) | 1d20 + WIS mod | 2 | Borrowed power, +1 Counter |
| Gana (Summoning) | creature rolls its own 1d20 + its mod | 1 (summon tile) | Summoner doesn't roll |

Range per application is bought with the exponential price (§12.4).

**Gana creature stat block:** same as a Mob (§8.1) with CR given by the skill; element = element spent. Lasts **1d6 + PB rounds** or until HP 0. It acts right after you in initiative. **Unattended check:** each round you don't spend your Action commanding it, roll d6 at its turn: 1 = it attacks you.

### 6.4 Skill Tree (unlocks by level)(Sample)
Tier levels: **I = Lv 1 · II = Lv 5 · III = Lv 9 · IV = Lv 13 · V = Lv 17.** Costs in Counters of one chosen element (unless stated).

| App | Skill | Tier | Cost | Formula & Effect |
|---|---|---|---|---|
| Cana | Arcane Bolt | I | 1 | 1d20 + 2×INT mod at one target in range |
| Cana | Elemental Burst | II | 2 | One damage roll to target tile + adjacent tiles; each creature rolls its own hit check |
| Cana | Conduit Chain | III | 2 | Up to 3 targets within 2 tiles of each other; 2nd/3rd take half the damage, rounded down |
| Cana | Conjure Terrain | IV | 2 | One tile in range: Path↔Wall or Path→Obstacle for 1d4 rounds (not Boss/Portal/Gate) |
| Cana | Cataclysm | V | 3 | 2d20 + 2×INT mod, radius 2 (not your tile); each creature rolls own hit check |
| Bhana | Infuse Weapon | I | 1 | 1d4 rounds: weapon attacks carry the element, +INT mod flat; Twin elements also grant that element's Buff |
| Bhana | Aegis Aura | II | 1 | 1d4 rounds: +1 AC and your defending element becomes the infused one |
| Bhana | Elemental Edge | III | 2 | 1d4 rounds: +1 Range and +PB to hit rolls |
| Bhana | Resonant Guard | IV | 2 | 1d4 rounds: Resistance to the infused element |
| Bhana | Avatar Form | V | 3 | 1d4 rounds: all Bhana buffs, weapon damage with Advantage, 2 attacks per Action |
| Prana | Borrowed Flame | I | 2 | 1d20 + WIS mod, range 2 |
| Prana | Divine Mend | II | 2 | Heal self or creature in range 1d20 + WIS mod (no traits) |
| Prana | Dual Invocation | III | 3 | Spend 2 different elements; one hit roll, two damage rolls (1d20 + WIS mod each), each with its own trait |
| Prana | Sanctuary | IV | 3 | Creature in range gains Resistance to the spent elements for 1d4 rounds |
| Prana | Judgment | V | 4 | 2d20 + WIS mod; ignores Resistance (treat as neutral) |
| Gana | Call Familiar | I | 2 | Summon, CR = half your Level, rounded down (minimum 1) |
| Gana | Twin Call | II | 3 | Two summons, each CR − 1 (min 1) |
| Gana | Greater Summon | III | 3 | Summon, CR = Level − 2 (min 1) |
| Gana | Bonded Beast | IV | 2 | Call Familiar/Greater Summon variants ignore the Unattended check |
| Gana | Colossus | V | 4 | Summon, CR = Level + 2; its attacks hit target tile + adjacent tiles |

### 6.5 Learning Skills
- **Skill Pick** at every odd Level (1, 3, … 19). Mage gets +1 extra pick at Levels 1, 9, 17.
- A pick unlocks any skill whose tier level ≤ your Level **and** whose lower tier in the same application you already know (Tier I has no prerequisite).
- One skill per Action. Weapon attacks and skills share the Action.

---

## 7. PvP Duels

**Trigger:** landing on a tile containing a rival (not on a Spawn tile — spawn tiles are sanctuary).

1. **Initiative:** each duelist rolls d20 + DEX mod; higher acts first, alternating Actions. More than two duelists = free-for-all in that order.
2. **Hit:** 2d6 only, **7+ hits.** Double = Critical Swing (§5.1).
3. **Damage:** 1d20 + stat mod, traits per §5.3, statuses per §5.4.
4. **End:** a duelist hits 0 HP, or passes a Retreat check (§4.7).
5. **Loot (winner chooses one):** ① half of loser's held SR (rounded down) ② one equipped item, picked by **a die roll matching the number of items** ③ one Boss Key. Stolen SR is spendable but does **not** raise the winner's Total SR; loser's Total SR and Level are unchanged.
6. **Defeat:** loser respawns on their Spawn tile at half Max HP (round up), keeps Counters, and **skips their next movement phase**. If they were in the Dungeon they are expelled.

---

## 8. PvE

### 8.1 Mob Stat Block (computed from CR)
- **All six stats = 1 + CR (maximum 20).** Level = CR. **AC = CR ÷ 3, rounded down.**
- **HP = 20 + 4×(1+CR) + 5×(CR−1) = 19 + 9×CR.**
- No hit roll (PvE attacks always hit). Damage: 1d20 + mod, then traits. Mobs have one element.
- **Mini-Boss:** CR+3, carries a Boss Key.
- **Board Mob CR = d4 + Depth − Spawn Penalty (minimum 1).** **Depth:** split the board into six equal bands by distance from the Boss tile; Depth is the band number, 0 at the rim rising to 5 beside the Boss, so mobs get tougher the closer you get to the Boss. (Option: a GM may reverse this so Depth rises outward from the Boss.) Mini-Boss adds +3 before the penalty.
- **Spawn Penalty (mobs weaken near Spawns):** let S = tile distance from the mob to the **nearest Spawn tile of any player**, and Z = protection radius (default **3**). **Penalty = Z + 1 − S, but never below 0.** So with Z = 3: adjacent to a Spawn −3, 2 tiles −2, 3 tiles −1, 4+ tiles none. Mobs are placed at setup, but the CR is computed from the final Spawn positions (§10.5), so it always reflects where players actually start.

| Mob d4 | Depth | Tiles from Spawn | Penalty | CR |
|---|---|---|---|---|
| 3 | 0 | 1 | −3 | **1** (minimum 1) |
| 4 | 0 | 2 | −2 | **2** |
| 3 | 1 | 3 | −1 | **3** |
| 3 | 1 | 5 | 0 | **4** |
- **Mob element:** by biome (§10.5): d6 1–3 first element, 4–6 second.

### 8.2 Rewards
- **SR:** look up killer's Level × mob CR on the SR table (§12.2). A single asterisk (*) = 0 SR (too weak). A double asterisk (**) = use the highest CR numeric in that Level row.
- **Counter:** +1 of the mob's element.
- **Bonus:** roll d6, on 6 roll once on the Chest Table.
- Attack counts: see weapon notes (§3).

### 8.3 Chest Table
Roll **d20 + 2×Depth** (dungeon chests: +4 more).

| Result | Contents |
|---|---|
| ≤ 7 | SR Pouch: d6 × 50 × (1+Depth) |
| 8–12 | Counter Cache: 2 Counters (Element Die each) |
| 13–16 | Gear: roll d14 |
| 17–19 | Hoard: d6 × 150 × (1+Depth) |
| 20+ | Relic: roll d14 gear with +1 AC (armor/shield) or +1 Range (weapon) |

Chest opening = Action. An opened Chest becomes Path.

---

## 9. Boss Fight

- **Unlock:** Boss Keys needed **K = 2**. A player holding K keys, standing in the antechamber beside the Boss tile, spends an Action to Unlock → **Global Breach**: door open for all; game becomes a sprint.
- **Boss block:** CR = highest player Level + 3 (min 4); stats 1 + CR (maximum 20); AC = CR ÷ 3, rounded down. **HP = (19 + 9×CR) × number of players.** Element: Element Die (8 = reroll). Players may attack from outside the Boss tile if within weapon/skill Range.
- **Aggro Token:** goes to the player who dealt the highest single-turn damage in the round (tie → higher d20).
- **Roll for Mutiny** (boss turn): every active player rolls d6; average rounded up = result. Boss attacks auto-hit; M = boss stat mod.

| Avg | Attack | Damage |
|---|---|---|
| 1 | Sluggish Strike | 1d20 + M to Aggro holder |
| 2–3 | Focused Cleave | 2d20 + M to Aggro holder |
| 4–5 | Elemental Surge | 3d20 + M to Aggro holder and drain 2 Counters |
| 6 | Devastating AoE Enrage | 2d20 + M to every player on the Boss tile, ignores Aggro |

Boss attacks use the boss element vs the target's defending element (§5.3).
**Win: the player who deals the killing blow.**

---

## 10. World Generation

The map is built from **chunks**. A chunk is a flower of 7 hex tiles: one centre tile with six tiles around it. Chunks fit together edge to edge, and every chunk touches six others. (The GM may choose larger chunks of 19, 37 or more tiles, or single-tile chunks; this guide assumes 7.) The **Boss chunk** always sits in the middle of the map.

### 10.1 The Two Loaders
Both loaders are physical dice trays, one die for each chunk slot.
- **Spawn Loader:** a ring of 6 slots, one d6 each. They are the six player spawn chunks, placed at the far end of the map: the outermost chunk in each of the six directions from the Boss chunk. Number them counterclockwise from the bottom-left: S1 bottom-left, S2 bottom-right, S3 right, S4 top-right, S5 top-left, S6 left.
- **Hex Loader:** one d6 for every other chunk, numbered ring by ring starting beside the Boss chunk and going outward, counterclockwise around each ring from the bottom-left. The standard kit holds 30 slots. There is no hard limit on map size: a GM who wants a bigger world adds further rings of dice, using extra dice or reusing the tray.

### 10.2 Map Size
The GM picks how many rings of chunks surround the Boss chunk. The map is always a full hexagon of chunks, and the six spawn chunks sit on the six corners of the outermost ring. The Hex Loader holds every chunk that is not the Boss chunk or a spawn chunk.

| Rings around the Boss | Hex Loader dice | Chunks (with Boss and spawn chunks) | Tiles |
|---|---|---|---|
| 1 | 0 | 7 | 49 |
| 2 | 12 | 19 | 133 |
| 3 | 30 | 37 | 259 |
| 4 | 54 | 61 | 427 |
| 5 | 84 | 91 | 637 |

Each extra ring adds six more chunks than the one before it, with no upper limit.

### 10.3 Biomes
There are 7 biomes. A chunk die of **1 to 5** gives a basic biome: 1 Forest, 2 Wetlands, 3 Badlands, 4 Volcanic, 5 Frozen. A **6** gives a special biome: flip a coin for **Ruins** (heads) or **Stormlands** (tails). The Boss chunk is the Boss Sanctum: the Boss tile surrounded by Path tiles.

**Spawn chunks never repeat a biome.** The six spawn chunks must all be different biomes. Roll the Spawn Loader one slot at a time, in order. If a die gives a biome that an earlier spawn chunk already has, reroll that die. A 6 is flipped for Ruins (heads) or Stormlands (tails) only while both specials are still free; if one special is already in the ring, a 6 gives the other one with no coin flip; if both are already in the ring, reroll. The Hex Loader chunks have no such restriction and may repeat any biome.

With the coin fair, Ruins and Stormlands are equally likely to be the special that appears. Note that a special is half as likely as any single basic biome on a given die: a 6 is one result in six, and the coin splits it between the two specials, so each special is one in twelve while each basic biome is one in six.

**Directional map (optional).** Instead of rolling the Hex Loader for biomes, every other chunk copies the biome of the nearest spawn chunk, so each of the six sides of the map is a single biome: if the bottom-left spawn chunk is Wetlands, the whole bottom-left side is Wetlands. Measure distance in chunks. A chunk exactly as close to two spawn chunks as to each other (on the line between two sides) rolls a die to pick between them; with three or more tied, roll a die numbered across them, rerolling overs. The Hex Loader is then not used for biomes. The GM may also fix any chunk's biome by hand in either mode, and a fixed chunk keeps its biome whatever its neighbours are.

**Manual spawn chunks (optional).** The GM may skip the automatic placement and choose which chunks are spawn chunks. They still follow the no-repeat rule unless the GM fixes their biomes.

### 10.4 Order of Generation
1. Roll every player's Affinity (§2.3).
2. Roll the Spawn Loader and set the biome of each spawn chunk, rerolling any die that repeats a biome already in the ring (§10.3).
3. Roll the Hex Loader and set the biome of every other chunk (or, in a directional map, copy the nearest spawn chunk's biome).
4. Roll every tile (§10.5).
5. Assign spawns (§10.6), then place Structures (§10.7), Lairs (§10.8) and Portals (§11.1).
6. Repair connectivity (§10.9).

### 10.5 Tile Types
Each tile in a chunk rolls a d20 on its biome's row. The ring of six tiles next to the Boss tile is always Path (the antechamber).

| Biome | Path | Mob | Wall | Obstacle | Chest | Mob elements (d6: 1–3 / 4–6) |
|---|---|---|---|---|---|---|
| Forest | 1–9 | 10–13 | 14–16 | 17–18 | 19–20 | Aero / Litho |
| Ruins | 1–7 | 8–12 | 13–17 | 18 | 19–20 | Luxis / Noctis |
| Wetlands | 1–6 | 7–10 | 11–12 | 13–18 | 19–20 | Aquis / Fulgo |
| Badlands | 1–8 | 9–13 | 14–17 | 18–19 | 20 | Litho / Pyris |
| Volcanic | 1–6 | 7–12 | 13–15 | 16–19 | 20 | Pyris / Fulgo |
| Frozen | 1–8 | 9–12 | 13–16 | 17–18 | 19–20 | Aquis / Aero |
| Stormlands | 1–7 | 8–11 | 12–14 | 15–18 | 19–20 | Aero / Fulgo |

Portal tiles are placed separately (§11.1). Tile types: Mob, Path, Wall, Obstacle, Chest, Portal.

### 10.6 Spawns and Arcana Advantage
A player's spawn is the **centre tile of a spawn chunk**. It is a Path tile, a Soul Corridor (stat and range shop) and a sanctuary.

A biome's **favour score** for your Affinity is the number of its two mob elements your Affinity has Advantage over, minus the number of its mob elements that have Advantage over your Affinity (using the ring Aquis > Pyris > Aero > Litho > Fulgo > Aquis). A biome is **favourable** if the score is above 0.

| Affinity | Favourable biome(s) | Avoid (score below 0) |
|---|---|---|
| Aquis | Badlands | Wetlands, Stormlands |
| Pyris | Forest, Stormlands | Wetlands |
| Aero | Forest | Volcanic |
| Litho | Wetlands, Volcanic | Forest, Frozen |
| Fulgo | Wetlands, Frozen | Forest, Badlands |
| Luxis / Noctis | none | none |

**Assigning spawns:** roll a die to pick a starting spawn chunk, then space the players evenly around the ring as their default chunks. In player order, each player takes the free spawn chunk with the best favour score for their Affinity; on a tie, the one closest to their default chunk. Unused spawn chunks play as ordinary chunks.

### 10.7 Chunk Hubs (Structures)
Every ordinary chunk (not the Boss chunk or a spawn chunk) rolls a d20 for its centre tile:

| d20 | Result |
|---|---|
| 1–2 | Soul Corridor outpost (shop) |
| 3 | Shrine: Action, heal 2d20 + WIS mod; the same player can't reuse it for 3 rounds |
| 4 | Ruined Outpost: the tile and up to 2 adjacent Path tiles become Chests |
| 5–20 | Nothing |

### 10.8 Mini-Boss Lairs and Keys
Place **2 lairs** (the GM may change this number, which is also the number of Boss Keys needed). Pick distinct chunks by die roll from every chunk except the Boss chunk and the spawn chunks. The centre tile of each becomes a Mini-Boss holding a Boss Key.

### 10.9 Connectivity Repair
After everything is placed, check that every non-Wall tile can be reached from the antechamber. For any tile that can't, turn one adjacent Wall into Path (roll among the adjacent Walls) and check again. Walls never fully enclose an area.

### 10.10 Fog (optional)
Chunks may be generated face-down and rolled when first revealed. Spawn chunks (each a different biome), the Boss chunk, Structures, Lairs and Portals are fixed at setup.

---

## 11. Portals & The Dungeon

**One dungeon, many doors.** Every Portal on the board leads to the **same shared dungeon**, through its own Gate.

### 11.1 Portal Generation
1. **Count:** roll a d4 and add one for every 12 chunks on the board (rounded down). The total is N.
2. **Place each:** pick an ordinary chunk by die roll (not the Boss chunk, a spawn chunk, or a chunk holding a Mini-Boss lair or another Portal) and put the Portal on that chunk's centre tile. Reroll up to 3 times if the pick is invalid, then use the nearest valid chunk.
3. **Number** portals 1…N in placement order: Portal k ↔ Dungeon Gate k.
4. **Behavior (d6 each):** 1–4 **Stable** · 5 **Flickering** (closes 1d4 rounds after any use) · 6 **Volatile** (you emerge at a random Gate chosen by die roll).

### 11.2 Entering
Standing on a Portal, spend 1 tile of movement to enter → placed on Gate k. The player is stranded off-board while rivals race. Players inside share the dungeon and can duel (§7).

### 11.3 Dungeon Generation (once per match, hidden until first entry)
1. **Size:** d6 → 1–2: Rd=2 (19 tiles) · 3–5: Rd=3 (37) · 6: Rd=4 (61).
2. **Theme:** d6 Crypt · Mine · Sunken Vault · Hive · Clockwork Hall · Nightmare.
3. **Element:** Element Die (8 = Chaos: each mob rolls its own).
4. **Tiles:** same ring numbering; center = **Dungeon Heart**. Each other tile d20: Path 1–6 · Mob 7–13 · Wall 14–16 · Obstacle 17–18 · Chest 19–20. Outer-ring spokes forced Path.
5. **Gates:** number the tiles of the outer ring clockwise from any starting tile. For each Gate, roll to pick a tile on that ring, rerolling if it is within 1 tile of another Gate. A Gate is a Path tile.
6. **Repair:** check reachability from all Gates and the Heart's neighbors, as in §10.9.
7. **Mobs:** CR = d4 + 2×(Rd − ring + 1). Element: d6 1–4 dungeon element, 5–6 Element Die. Stats per §8.1.
8. **Heart:** Dungeon Guardian CR = 6 + 2×Rd, plus a **Legendary Chest**.

### 11.4 Leaving
- **Withdraw (Action, from anywhere in the dungeon)** is allowed once you have **defeated at least one Mob this visit** (waived when no living Mobs remain).
- **Emerge:** d6 → 1–4 at the Portal you entered; 5–6 at a random Portal chosen by die roll. Flickering/Volatile rules apply.
- Death (PvP or Mob) → respawn at your Spawn tile (§7.6).

### 11.5 Persistence
Killed Mobs, opened Chests and the Guardian stay gone for everyone. Dungeon Chests use +4 on the Chest Table roll.

### 11.6 Legendary Chest (roll d6, reroll nothing)
| d6 | Reward |
|---|---|
| 1 | Soul Hoard: d6 × 1,000 SR held |
| 2 | Stat Relic: +1 to one stat (max 20), free |
| 3 | Range Relic: +1 Range to one weapon class or application, free |
| 4 | Arcana Fount: set Counters to 4 (any elements) |
| 5 | Legendary Gear: d14 gear with +1 AC / +1 Range, no DEX/CON penalty |
| 6 | Key of Breach: counts as one Boss Key |

---

## 12. Soul Resonance

SR is XP and currency. **Total SR** (lifetime earned) drives Level; **SR held** is spendable. Start 0.

### 12.1 Level & Proficiency (highest row with Total SR ≥ threshold)
| Soul Resonance | Level | Proficiency Bonus |
|---|---|---|
| 0 | 1 | +2 |
| 300 | 2 | +2 |
| 900 | 3 | +2 |
| 2,700 | 4 | +2 |
| 6,500 | 5 | +3 |
| 14,000 | 6 | +3 |
| 23,000 | 7 | +3 |
| 34,000 | 8 | +3 |
| 48,000 | 9 | +4 |
| 64,000 | 10 | +4 |
| 85,000 | 11 | +4 |
| 100,000 | 12 | +4 |
| 120,000 | 13 | +5 |
| 140,000 | 14 | +5 |
| 165,000 | 15 | +5 |
| 195,000 | 16 | +5 |
| 225,000 | 17 | +6 |
| 265,000 | 18 | +6 |
| 305,000 | 19 | +6 |
| 355,000 | 20 | +6 |

### 12.2 SR per Mob (Level × CR)
CR 1–10:

| Level | CR1 | CR2 | CR3 | CR4 | CR5 | CR6 | CR7 | CR8 | CR9 | CR10 |
|---|---|---|---|---|---|---|---|---|---|---|
| 1st–3rd | 300 | 600 | 900 | 1,350 | 1,800 | 2,700 | 3,600 | 5,400 | 7,200 | 10,800 |
| 4th | 300 | 600 | 800 | 1,200 | 1,600 | 2,400 | 3,200 | 4,800 | 6,400 | 9,600 |
| 5th | 300 | 500 | 750 | 1,000 | 1,500 | 2,250 | 3,000 | 4,500 | 6,000 | 9,000 |
| 6th | 300 | 450 | 600 | 900 | 1,200 | 1,800 | 2,700 | 3,600 | 5,400 | 7,200 |
| 7th | 263 | 350 | 525 | 700 | 1,050 | 1,400 | 2,100 | 3,150 | 4,200 | 6,300 |
| 8th | 200 | 300 | 400 | 600 | 800 | 1,200 | 1,600 | 2,400 | 3,600 | 4,800 |
| 9th | \* | 225 | 338 | 450 | 675 | 900 | 1,350 | 1,800 | 2,700 | 4,050 |
| 10th | \* | \* | 250 | 375 | 500 | 750 | 1,000 | 1,500 | 2,000 | 3,000 |
| 11th | \* | \* | \* | 275 | 413 | 550 | 825 | 1,100 | 1,650 | 2,200 |
| 12th | \* | \* | \* | \* | 300 | 450 | 600 | 900 | 1,200 | 1,800 |
| 13th | \* | \* | \* | \* | \* | 325 | 488 | 650 | 975 | 1,300 |
| 14th | \* | \* | \* | \* | \* | \* | 350 | 525 | 700 | 1,050 |
| 15th | \* | \* | \* | \* | \* | \* | \* | 375 | 563 | 750 |
| 16th | \* | \* | \* | \* | \* | \* | \* | \* | 400 | 600 |
| 17th | \* | \* | \* | \* | \* | \* | \* | \* | \* | 425 |
| 18th–20th | \* | \* | \* | \* | \* | \* | \* | \* | \* | \* |

CR 11–20:

| Level | CR11 | CR12 | CR13 | CR14 | CR15 | CR16 | CR17 | CR18 | CR19 | CR20 |
|---|---|---|---|---|---|---|---|---|---|---|
| 1st–3rd | \*\* | \*\* | \*\* | \*\* | \*\* | \*\* | \*\* | \*\* | \*\* | \*\* |
| 4th | 12,800 | \*\* | \*\* | \*\* | \*\* | \*\* | \*\* | \*\* | \*\* | \*\* |
| 5th | 12,000 | 18,000 | \*\* | \*\* | \*\* | \*\* | \*\* | \*\* | \*\* | \*\* |
| 6th | 10,800 | 14,400 | 21,600 | \*\* | \*\* | \*\* | \*\* | \*\* | \*\* | \*\* |
| 7th | 8,400 | 12,600 | 16,800 | 25,200 | \*\* | \*\* | \*\* | \*\* | \*\* | \*\* |
| 8th | 7,200 | 9,600 | 14,400 | 19,200 | 28,800 | \*\* | \*\* | \*\* | \*\* | \*\* |
| 9th | 5,400 | 8,100 | 10,800 | 16,200 | 21,600 | 32,400 | \*\* | \*\* | \*\* | \*\* |
| 10th | 4,500 | 6,000 | 9,000 | 12,000 | 18,000 | 24,000 | 36,000 | \*\* | \*\* | \*\* |
| 11th | 3,300 | 4,950 | 6,600 | 9,900 | 13,200 | 19,800 | 26,400 | 39,600 | \*\* | \*\* |
| 12th | 2,400 | 3,600 | 5,400 | 7,200 | 10,800 | 14,400 | 21,600 | 28,800 | 43,200 | \*\* |
| 13th | 1,950 | 2,600 | 3,900 | 5,850 | 7,800 | 11,700 | 15,600 | 23,400 | 31,200 | 46,800 |
| 14th | 1,400 | 2,100 | 2,800 | 4,200 | 6,300 | 8,400 | 12,600 | 16,800 | 25,200 | 33,600 |
| 15th | 1,125 | 1,500 | 2,250 | 3,000 | 4,500 | 6,750 | 9,000 | 13,500 | 18,000 | 27,000 |
| 16th | 800 | 1,200 | 1,600 | 2,400 | 3,200 | 4,800 | 7,200 | 9,600 | 14,400 | 19,200 |
| 17th | 638 | 850 | 1,275 | 1,700 | 2,550 | 3,400 | 5,100 | 7,650 | 10,200 | 15,300 |
| 18th | 450 | 675 | 900 | 1,350 | 1,800 | 2,700 | 3,600 | 5,400 | 8,100 | 10,800 |
| 19th | \* | 475 | 713 | 950 | 1,425 | 1,900 | 2,850 | 3,800 | 5,700 | 8,550 |
| 20th | \* | 500 | 750 | 1,000 | 1,500 | 2,000 | 3,000 | 4,000 | 4,000 | 6,000 |

A single asterisk (*) = too weak, 0 SR. A double asterisk (**) = not reachable; use the highest CR value shown in that Level row (§8.2).

### 12.3 Soul Corridor — Stat Upgrades
Buy one point at a time; the price is the row for the **target** stat value. Available on Spawn tiles and Soul Corridor outposts. Buying reduces SR held only.

| Stat Modifier Value | Soul Resonance Price |
|---|---|
| 2 | 225 |
| 3 | 450 |
| 4 | 1,350 |
| 5 | 2,850 |
| 6 | 5,625 |
| 7 | 6,750 |
| 8 | 8,250 |
| 9 | 10,500 |
| 11 | 12,000 |
| 12 | 15,750 |
| 13 | 11,250 |
| 14 | 15,000 |
| 15 | 15,000 |
| 16 | 18,750 |
| 17 | 22,500 |
| 18 | 22,500 |
| 19 | 30,000 |
| 20 | 30,000 |

> Note: Stat 10 has no listed price; the DM sets it.

### 12.4 Range Pricing
**Range Price = Base Price × 2^(Current Range)**, paid for +1 Range on a weapon class or Arcana application. Base Price default 500 SR: 0→1 500 · 1→2 1,000 · 2→3 2,000 · 3→4 4,000 · 4→5 8,000.

---

## 13. Turn Checklist

1. Round initiative (d20 + DEX mod). 2. Move (Move Die + Speed Mod, min 2). 3. Action. 4. Resolve landings (Mob / duel / chest / portal). 5. Statuses tick at the start of the afflicted turn. 6. Breach and boss round when unlocked.

---
