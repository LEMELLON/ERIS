// Wheel: Water > Fire > Air > Earth > Water. Light/Dark sit outside the wheel.
export const WHEEL = ['water', 'fire', 'air', 'earth'];
export const ADVANTAGE = 1.5;
export const DISADVANTAGE = 0.5;

// Returns the damage multiplier for attacker element vs defender element.
// ASSUMPTION: only Light gets a bonus against Dark (handoff: "Light bonus vs Dark").
export function elementMultiplier(att, def) {
  if (att === 'light' && def === 'dark') return ADVANTAGE;
  const a = WHEEL.indexOf(att), d = WHEEL.indexOf(def);
  if (a < 0 || d < 0) return 1;
  if ((a + 1) % 4 === d) return ADVANTAGE;     // attacker beats defender
  if ((d + 1) % 4 === a) return DISADVANTAGE;  // defender beats attacker
  return 1;
}
