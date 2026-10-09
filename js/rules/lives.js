import { BALANCE } from '../data/balance.js';
import { derive } from './stats.js';

// At 0 HP: lose a life, respawn at the biome Start node with full HP/MP.
// Total SR/level are kept; a share of Wallet SR is lost (PLACEHOLDER fraction).
// Third death = permadeath (caller creates a new Lv1 character).
export function handleDeath(ch, startNode) {
  const lives = ch.lives - 1;
  if (lives <= 0) return { permadeath: true, ch: { ...ch, lives: 0, hp: 0 } };
  const d = derive(ch);
  const lost = Math.floor(ch.walletSR * BALANCE.lives.walletLossFraction);
  return {
    permadeath: false,
    walletLost: lost,
    ch: { ...ch, lives, hp: d.maxHp, mp: d.maxMp, statuses: [], walletSR: ch.walletSR - lost, pos: startNode },
  };
}
