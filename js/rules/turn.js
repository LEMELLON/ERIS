// Encounter / round / turn flow. Pure: every function returns a new state.
import { rollInitiative, modifier, derive } from './stats.js';
import { tickStatuses } from './status.js';
import { tickSummons } from './summons.js';

// combatants: [{ id, ch }] (ch has attrs). Enemies without attrs use { initMod }.
export function startEncounter(roller, combatants) {
  const rolled = combatants.map((c, i) => {
    const mod = c.ch?.attrs ? modifier(c.ch.attrs.AGI) : (c.initMod || 0);
    const value = c.ch?.attrs ? rollInitiative(roller, c.ch.attrs) : roller.roll(20, 'Initiative') + mod;
    return { id: c.id, value, mod, i };
  });
  rolled.sort((a, b) => b.value - a.value || b.mod - a.mod || a.i - b.i);
  return {
    round: 1, turnIndex: 0, order: rolled.map(r => r.id),
    initiative: Object.fromEntries(rolled.map(r => [r.id, r.value])),
    damageThisRound: {}, damageLastRound: {}, ultimatesUsed: [],
  };
}

export const currentActor = enc => enc.order[enc.turnIndex];

// Record damage dealt (for Aion's aggro: top damage dealer of the previous round).
export const recordDamage = (enc, id, amount) =>
  ({ ...enc, damageThisRound: { ...enc.damageThisRound, [id]: (enc.damageThisRound[id] || 0) + amount } });

// Advance to the next combatant that is still up. isDown(id) -> bool. Wrapping starts a new round.
export function nextTurn(enc, isDown = () => false) {
  let e = enc;
  for (let n = 0; n < e.order.length; n++) {
    let idx = e.turnIndex + 1, round = e.round, dmgThis = e.damageThisRound, dmgLast = e.damageLastRound;
    if (idx >= e.order.length) { idx = 0; round++; dmgLast = dmgThis; dmgThis = {}; }
    e = { ...e, turnIndex: idx, round, damageThisRound: dmgThis, damageLastRound: dmgLast };
    if (!isDown(e.order[idx])) return e;
  }
  return e; // everyone is down
}

// Start of a combatant's turn: status DoTs tick, summons age, budgets refresh.
export function startTurn(ch, summons = [], speedBonus = 0) {
  const { target, damage } = tickStatuses(ch);
  return {
    ch: target, dotDamage: damage, summons: tickSummons(summons),
    turn: { movementLeft: derive(ch).speed + speedBonus, actionUsed: false },
  };
}

export function spendMovement(turn, tiles) {
  if (tiles > turn.movementLeft) return { ok: false, turn };
  return { ok: true, turn: { ...turn, movementLeft: turn.movementLeft - tiles } };
}

export function useAction(turn) {
  if (turn.actionUsed) return { ok: false, turn };
  return { ok: true, turn: { ...turn, actionUsed: true } };
}

export const isTeamDown = chars => chars.every(c => c.hp <= 0);
