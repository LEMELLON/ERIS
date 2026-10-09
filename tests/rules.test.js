import test from 'node:test';
import assert from 'node:assert/strict';
import { createRoller } from '../js/core/rng.js';
import { on } from '../js/core/events.js';
import { CHAMPIONS } from '../js/data/champions.js';
import { modifier, derive, createCharacter } from '../js/rules/stats.js';
import { elementMultiplier } from '../js/rules/elements.js';
import { attackRoll, resolveAttack } from '../js/rules/combat.js';
import { applyStatus, tickStatuses } from '../js/rules/status.js';
import { chooseAction, nearestTarget } from '../js/rules/enemy-ai.js';
import { levelForSR, mobSR, awardSR, upgradeAttribute } from '../js/rules/economy.js';
import { handleDeath } from '../js/rules/lives.js';
import { rollWeaponDrop, rollConsumableQuantity } from '../js/rules/loot.js';
import { createSummon, absorbHit, bloodCovenant } from '../js/rules/summons.js';
import { spendMp, useUltimate, abilitiesFor } from '../js/rules/abilities.js';
import { createMob } from '../js/data/mobs.js';

const fixed = (...vals) => createRoller(1, [...vals]);

test('rng is deterministic and state restores', () => {
  const a = createRoller(42), b = createRoller(42);
  const seqA = [a.roll(20), a.roll(6), a.roll(6)];
  assert.deepEqual(seqA, [b.roll(20), b.roll(6), b.roll(6)]);
  const s = a.getState(); const x = a.roll(20); a.setState(s);
  assert.equal(a.roll(20), x);
});

test('roll emits an event and physical queue wins', () => {
  const seen = [];
  on('roll', e => seen.push(e));
  const r = fixed(5);
  assert.equal(r.roll(6, 'test'), 5);
  assert.equal(seen.at(-1).physical, true);
});

test('modifier and derived stats', () => {
  assert.equal(modifier(15), 2);
  assert.equal(modifier(20), 3);
  // GDD worked example: Bhana L1 = 32 HP, 15 MP, Phys DEF 4, Mag DEF 2, AGI 10 -> 3 tiles
  const b = derive({ attrs: CHAMPIONS.achilles.attrs, level: 1 });
  assert.deepEqual([b.maxHp, b.maxMp, b.physDef, b.magDef, b.speed], [32, 15, 4, 2, 3]);
  assert.equal(derive({ attrs: CHAMPIONS.atalanta.attrs, level: 1 }).speed, 5); // AGI 20
});

test('element wheel', () => {
  assert.equal(elementMultiplier('water', 'fire'), 1.5);
  assert.equal(elementMultiplier('fire', 'water'), 0.5);
  assert.equal(elementMultiplier('earth', 'water'), 1.5); // wheel wraps
  assert.equal(elementMultiplier('water', 'air'), 1);
  assert.equal(elementMultiplier('light', 'dark'), 1.5);
  assert.equal(elementMultiplier('dark', 'light'), 1);
});

test('attack: crit, auto-miss, normal', () => {
  assert.equal(attackRoll(fixed(6, 6), { attrMod: 0, proficiency: 0, defense: 99 }).hit, true);
  assert.equal(attackRoll(fixed(1, 1), { attrMod: 50, proficiency: 50, defense: 1 }).hit, false);
  assert.equal(attackRoll(fixed(4, 5), { attrMod: 2, proficiency: 2, defense: 13 }).hit, true);  // 13
  assert.equal(attackRoll(fixed(4, 5), { attrMod: 2, proficiency: 2, defense: 14 }).hit, false);
});

test('damage doubles on crit and scales by element', () => {
  const r = resolveAttack(fixed(6, 6, 4), { attrMod: 2, proficiency: 2, rarity: 'common', element: 'water' },
    { defense: 20, element: 'fire' });
  assert.equal(r.crit, true);
  assert.equal(r.damage, Math.floor((4 + 2) * 2 * 1.5)); // 18
});

test('status DoT ticks and expires', () => {
  let t = applyStatus({ hp: 20, statuses: [] }, 'ignited');
  let out;
  for (let i = 0; i < 3; i++) { out = tickStatuses(t); t = out.target; }
  assert.equal(t.hp, 14);
  assert.equal(t.statuses.length, 0);
});

test('enemy ai table and nearest target', () => {
  assert.equal(chooseAction(fixed(3)).action, 'basic');
  assert.equal(chooseAction(fixed(4)).action, 'skill');
  assert.equal(chooseAction(fixed(6)).action, 'ultimate');
  const n = nearestTarget({ pos: { q: 0, r: 0 } }, [{ hp: 5, pos: { q: 3, r: 0 } }, { hp: 5, pos: { q: 1, r: 1 } }, { hp: 0, pos: { q: 0, r: 0 } }]);
  assert.equal(n.index, 1);
});

test('SR, levels and upgrades', () => {
  assert.equal(mobSR(1), 10);
  assert.equal(mobSR(10), 51); // min(100, 51, 51)
  assert.equal(levelForSR(0), 1);
  assert.equal(levelForSR(10), 2);
  assert.equal(levelForSR(99), 4);
  assert.equal(levelForSR(100), 5);
  assert.equal(levelForSR(1900), 20);
  assert.equal(levelForSR(99999), 20);
  let ch = awardSR(createCharacter(CHAMPIONS.medea), 100);
  assert.equal(ch.walletSR, 100);
  const up = upgradeAttribute(ch, 'STR'); // cost 60
  assert.equal(up.ok, true);
  assert.equal(up.ch.walletSR, 40);
  assert.equal(upgradeAttribute({ ...ch, attrs: { ...ch.attrs, INT: 20 } }, 'INT').reason, 'cap');
});

test('lives: respawn then permadeath', () => {
  let ch = awardSR(createCharacter(CHAMPIONS.achilles), 40);
  let res = handleDeath({ ...ch, hp: 0 }, { q: 0, r: 0 });
  assert.equal(res.permadeath, false);
  assert.equal(res.ch.lives, 2);
  assert.equal(res.ch.walletSR, 30);
  res = handleDeath({ ...res.ch, hp: 0 }, { q: 0, r: 0 });
  res = handleDeath({ ...res.ch, hp: 0 }, { q: 0, r: 0 });
  assert.equal(res.permadeath, true);
});

test('loot thresholds, nat 20 upgrade, quantity', () => {
  assert.equal(rollWeaponDrop(fixed(10), 'easy').dropped, false);
  assert.equal(rollWeaponDrop(fixed(11), 'easy').dropped, true);
  assert.equal(rollWeaponDrop(fixed(19), 'guardian').dropped, false);
  const up = rollWeaponDrop(fixed(20), 'hard', 'common');
  assert.equal(up.rarity, 'uncommon');
  assert.equal(rollWeaponDrop(fixed(20), 'hard', 'rare').rarity, 'rare');
  assert.equal(rollConsumableQuantity(fixed(10)).quantity, 1);
  assert.equal(rollConsumableQuantity(fixed(19)).quantity, 2);
  assert.equal(rollConsumableQuantity(fixed(20)).quantity, 3);
});

test('summons absorb a whole hit, blood covenant, mp and ultimates', () => {
  const orpheus = createCharacter(CHAMPIONS.orpheus);
  const s = createSummon(orpheus, { q: 0, r: 0 });
  const r = absorbHit([s], 50);
  assert.equal(r.damageTaken, 0);
  assert.equal(r.summons.length, 0);
  assert.equal(bloodCovenant({ hp: 20, mp: 0 }, 100).ch.mp, 30);
  assert.equal(bloodCovenant({ hp: 15, mp: 0 }, 100).ok, false);
  assert.equal(spendMp({ mp: 3 }, 5).ok, false);
  const u1 = useUltimate({}, 'Medea');
  assert.equal(useUltimate(u1.encounter, 'Medea').ok, false);
});

test('abilities unlock by level; mobs build from data', () => {
  assert.deepEqual(abilitiesFor('Prana', 1).map(a => a.name), ['Arcane Bolt']);
  assert.equal(abilitiesFor('Gana', 7).length, 4);
  assert.equal(abilitiesFor('Cana', 10).at(-1).cost, 30);
  assert.equal(createMob('pyria', 'hard').name, 'Phlox Elemental');
  assert.equal(createMob('geia', 'guardian').name, 'Gaia');
});

import { weaponFor, WEAPONS } from '../js/data/weapons.js';
import { BASE_ARMOR, BIOME_ARMOR, mobArmorFor } from '../js/data/armor.js';
import { lootFor } from '../js/rules/loot.js';
import { useRestoration } from '../js/rules/consumables.js';
import { defeatGuardian, hasEternalKey, aionTarget, aionAreaAttack, hitAion } from '../js/rules/boss.js';

test('weapon and armor data is complete', () => {
  assert.equal(Object.keys(WEAPONS).length, 6);
  for (const b of Object.keys(WEAPONS)) for (const t of ['easy', 'medium', 'hard', 'guardian'])
    for (const c of ['Cana', 'Bhana', 'Prana', 'Gana']) {
      assert.ok(weaponFor(b, t, c).name, `${b} ${t} ${c} weapon`);
      assert.ok(mobArmorFor(b, t, c).name, `${b} ${t} ${c} armor`);
    }
  for (const b of Object.keys(BIOME_ARMOR)) for (const r of ['rare', 'legendary']) assert.equal(Object.keys(BIOME_ARMOR[b][r]).length, 4);
  assert.equal(weaponFor('geia', 'guardian', 'Cana').name, 'Gaia’s Verdant Longbow');
  assert.equal(BIOME_ARMOR.pyria.legendary.Bhana.name, 'AmóniKardiá');
  assert.equal(BASE_ARMOR.uncommon.Prana, 'Pythia’s Robe');
});

test('lootFor: drop, nat-20 tier upgrade, guardian drops', () => {
  const mob = createMob('pyria', 'easy');
  const miss = lootFor(fixed(5, 1, 1), mob, 'Cana');     // weapon roll 5 fails; qty roll 1 -> 1; pick 1
  assert.equal(miss.weapon, null);
  assert.equal(miss.consumables.length, 1);
  const up = lootFor(fixed(20, 20, 1, 1, 1), mob, 'Prana'); // nat 20 -> medium weapon; qty 20 -> 3 items
  assert.equal(up.weapon.name, 'Pyre Rod');
  assert.equal(up.weapon.rarity, 'uncommon');
  assert.equal(up.consumables.length, 3);
  const g = lootFor(fixed(20, 1, 1), createMob('aeria', 'guardian'), 'Gana');
  assert.equal(g.weapon.name, 'Skybound Tome');
  assert.equal(g.consumables.length, 2);
});

test('restoration potions heal by percent of max', () => {
  const ch = { ...createCharacter(CHAMPIONS.achilles), hp: 1, mp: 0 }; // max 32 / 15
  const r = useRestoration(ch, 'elixir');
  assert.equal(r.ch.hp, 1 + Math.floor(32 * 0.15));
  assert.equal(r.ch.mp, Math.floor(15 * 0.15));
  assert.equal(useRestoration(ch, 'lucky_coin').ok, false);
});

test('guardians, key, aggro and final blow', () => {
  let f = [];
  for (const b of ['pyria', 'geia', 'hydoria', 'aeria', 'aeria']) f = defeatGuardian(f, b);
  assert.equal(f.length, 4);
  assert.equal(hasEternalKey(f), true);
  assert.equal(hasEternalKey(['pyria']), false);
  assert.equal(aionTarget({ A: 5, B: 12, C: 3 }), 'B');
  assert.equal(aionTarget({ A: 0 }), null);
  const atk = aionAreaAttack(fixed(2, 4, 6, 8), 4);
  assert.equal(atk.average, 5);
  assert.equal(atk.attack.max, 5);
  let r = hitAion({ hp: 10 }, 'Medea', 4);
  assert.equal(r.winner, null);
  r = hitAion(r.aion, 'Orpheus', 20);
  assert.equal(r.winner, 'Orpheus');
});

import * as rngMod from '../js/core/rng.js';
test('module-level roll API exists and is seeded', () => {
  rngMod.setSeed(7);
  const a = [rngMod.roll(20), rngMod.roll(6)];
  rngMod.setSeed(7);
  assert.deepEqual(a, [rngMod.roll(20), rngMod.roll(6)]);
  const s = rngMod.getRngState(); const x = rngMod.roll(20); rngMod.setRngState(s);
  assert.equal(rngMod.roll(20), x);
});

import { startEncounter, currentActor, nextTurn, recordDamage, startTurn, spendMovement, useAction } from '../js/rules/turn.js';
import { enemyTurn, mobStats } from '../js/rules/enemy-ai.js';

test('initiative order, rounds and aggro damage rollover', () => {
  const A = createCharacter(CHAMPIONS.atalanta), B = createCharacter(CHAMPIONS.achilles);
  // d20 rolls: Atalanta 5 (+3 AGI mod = 8), Achilles 7 (+1 = 8), mob 2 -> tie broken by higher AGI mod
  let enc = startEncounter(fixed(5, 7, 2), [{ id: 'A', ch: A }, { id: 'B', ch: B }, { id: 'M', initMod: 0 }]);
  assert.deepEqual(enc.order, ['A', 'B', 'M']);
  enc = recordDamage(enc, 'A', 7);
  enc = nextTurn(enc); enc = nextTurn(enc); assert.equal(currentActor(enc), 'M');
  enc = nextTurn(enc);
  assert.equal(enc.round, 2);
  assert.equal(currentActor(enc), 'A');
  assert.deepEqual(enc.damageLastRound, { A: 7 });
  assert.deepEqual(enc.damageThisRound, {});
  // downed combatants are skipped
  enc = nextTurn(enc, id => id === 'B');
  assert.equal(currentActor(enc), 'M');
});

test('turn budgets: movement and one action', () => {
  const s = startTurn({ ...createCharacter(CHAMPIONS.achilles), statuses: [] });
  assert.equal(s.turn.movementLeft, 3);
  assert.equal(spendMovement(s.turn, 4).ok, false);
  const m = spendMovement(s.turn, 2);
  assert.equal(m.turn.movementLeft, 1);
  const a = useAction(m.turn);
  assert.equal(useAction(a.turn).ok, false);
});

test('start of turn ticks DoTs and summons', () => {
  const ch = applyStatus({ ...createCharacter(CHAMPIONS.medea), hp: 20 }, 'ignited');
  const s = startTurn(ch, [{ turns: 1, hp: 1 }, { turns: 3, hp: 1 }]);
  assert.equal(s.dotDamage, 2);
  assert.equal(s.ch.hp, 18);
  assert.equal(s.summons.length, 1);
});

test('enemy turn: attacks nearest player, summon absorbs hit', () => {
  const mob = { ...createMob('pyria', 'easy', { q: 0, r: 0 }), pos: { q: 0, r: 0 } };
  const near = { ch: { ...createCharacter(CHAMPIONS.achilles) }, pos: { q: 1, r: 0 }, summons: [{ hp: 1, turns: 2 }] };
  const far = { ch: { ...createCharacter(CHAMPIONS.medea) }, pos: { q: 5, r: 0 }, summons: [] };
  // d6 behaviour 1 (basic), attack dice 6,6 = crit, damage die 3
  const r = enemyTurn(fixed(1, 6, 6, 3), mob, [far, near]);
  assert.equal(r.action, 'basic');
  assert.equal(r.targetIndex, 1);
  assert.equal(r.result.absorbed, true);
  assert.equal(r.targets[1].ch.hp, near.ch.hp);
  assert.equal(r.targets[1].summons.length, 0);
  // no summon: damage lands
  const r2 = enemyTurn(fixed(1, 6, 6, 3), mob, [{ ...near, summons: [] }]);
  assert.ok(r2.targets[0].ch.hp < near.ch.hp);
  assert.equal(mobStats(1).maxHp, 23);
});
