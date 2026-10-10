// Seeded RNG (mulberry32) plus the single roll() entry point.
// Every die in the game goes through roller.roll(sides, label, group).
// The result is decided here first; the 3D dice and log only visualise it.
import { emit } from './events.js';

export function mulberry32(seed) {
  let a = seed >>> 0;
  const next = () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return { next, getState: () => a, setState: s => { a = s >>> 0; } };
}

// physicalQueue: array of typed real-dice results consumed before the RNG is used.
export function createRoller(seed = 1, physicalQueue = null) {
  const rng = mulberry32(seed);
  const roller = {
    physicalQueue,
    roll(sides, label = '', group = null) {
      let value;
      let physical = false;
      if (roller.physicalQueue && roller.physicalQueue.length) {
        value = roller.physicalQueue.shift();
        physical = true;
      } else {
        value = 1 + Math.floor(rng.next() * sides);
      }
      emit('roll', { sides, value, label, group, physical });
      return value;
    },
    getState: () => rng.getState(),
    setState: s => rng.setState(s),
  };
  return roller;
}

// ---- Module-level API (handoff section 3): one shared roller for the whole app ----
// import { roll, setSeed } from '../core/rng.js'
let shared = createRoller(1);
export const roll = (sides, label = '', group = null) => shared.roll(sides, label, group);
export const setSeed = (seed, physicalQueue = null) => { shared = createRoller(seed, physicalQueue); return shared; };
export const getRngState = () => shared.getState();
export const setRngState = s => shared.setState(s);
export const setPhysicalQueue = q => { shared.physicalQueue = q; };
export const getRoller = () => shared;

// rollN(n, sides, label, group): roll n dice through the shared roller and return the SUM (e.g. rollN(2, 6) = 2d6).
// Pass { list: true } as the 5th argument to get the individual dice array instead.
export const rollN = (n, sides, label = '', group = null, opts = {}) => {
  const dice = [];
  for (let i = 0; i < n; i++) dice.push(shared.roll(sides, label, group));
  return opts.list ? dice : dice.reduce((a, b) => a + b, 0);
};

// Aliases for older call sites. seed(n) reseeds the shared roller.
export const seed = setSeed;
