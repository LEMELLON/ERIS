import { BALANCE } from '../data/balance.js';
import { MAX_LEVEL, MAX_ATTRIBUTE, sRForLevel, ATTRIBUTE_UPGRADE_COST_PER_POINT } from '../data/levels.js';

export const mobSR = cr => BALANCE.mobSR(cr);

export function levelForSR(totalSR) {
  let lvl = 1;
  while (lvl < MAX_LEVEL && totalSR >= sRForLevel(lvl + 1)) lvl++;
  return lvl;
}

// Kills add to BOTH Total SR (levelling) and Wallet SR (spending/wagering).
export function awardSR(ch, amount) {
  const totalSR = ch.totalSR + amount;
  return { ...ch, totalSR, walletSR: ch.walletSR + amount, level: levelForSR(totalSR) };
}

export const upgradeCost = score => score * ATTRIBUTE_UPGRADE_COST_PER_POINT;

export function upgradeAttribute(ch, attr) {
  const score = ch.attrs[attr];
  const cost = upgradeCost(score);
  if (score >= MAX_ATTRIBUTE) return { ok: false, reason: 'cap', ch };
  if (ch.walletSR < cost) return { ok: false, reason: 'funds', ch };
  return { ok: true, ch: { ...ch, walletSR: ch.walletSR - cost, attrs: { ...ch.attrs, [attr]: score + 1 } } };
}
