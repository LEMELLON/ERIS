import { CONSUMABLES } from '../data/consumables.js';
import { derive } from './stats.js';

const byId = id => CONSUMABLES.find(c => c.id === id);

// Restoration items only (percent of max HP/MP). Other effects need the turn engine and are not applied here.
export function useRestoration(ch, id) {
  const item = byId(id);
  if (!item || (!item.effect.hpPct && !item.effect.mpPct)) return { ok: false, ch };
  const d = derive(ch);
  const hp = Math.min(d.maxHp, ch.hp + Math.floor(d.maxHp * (item.effect.hpPct || 0) / 100));
  const mp = Math.min(d.maxMp, ch.mp + Math.floor(d.maxMp * (item.effect.mpPct || 0) / 100));
  return { ok: true, ch: { ...ch, hp, mp } };
}
