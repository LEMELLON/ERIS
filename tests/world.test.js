import test from'node:test';import assert from'node:assert';
import{seed}from'../js/core/rng.js';import{generate,DEFAULT_CFG}from'../js/world/generate.js';
import{mod,maxMP}from'../js/rules/stats.js';import{mult}from'../js/rules/elements.js';import{mobSR}from'../js/data/levels.js';
const g=s=>{seed(s);return generate({...DEFAULT_CFG,seed:s})};
test('deterministic',()=>assert.deepStrictEqual(g(5).T,g(5).T));
test('spawn chunks have 4 distinct biomes',()=>{for(let s=1;s<30;s++){const b=g(s).chunks.filter(c=>c.spawn).map(c=>c.b);assert.strictEqual(new Set(b).size,4)}});
test('4 spawns, boss tile',()=>{const T=g(3).T;assert.strictEqual(Object.values(T).filter(t=>t.sp).length,4);assert.strictEqual(T['0,0'].t,'B')});
test('elements',()=>{assert.strictEqual(mult('Water','Fire'),1.5);assert.strictEqual(mult('Fire','Water'),.5);assert.strictEqual(mult('Fire','Fire'),1)});
test('stats/loot',()=>{assert.strictEqual(mod(20),3);assert.strictEqual(maxMP({st:{INT:20}}),25);assert.strictEqual(mobSR(1),10)});
