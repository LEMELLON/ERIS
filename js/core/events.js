// Tiny pub/sub. Log, 3D dice and the simulation recorder all listen here.
const handlers = {};
export const on = (type, fn) => (handlers[type] = handlers[type] || []).push(fn);
export const off = (type, fn) => { handlers[type] = (handlers[type] || []).filter(f => f !== fn); };
export const emit = (type, payload) => (handlers[type] || []).forEach(fn => fn(payload));
