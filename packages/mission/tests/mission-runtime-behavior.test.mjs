import test from 'node:test';
import assert from 'node:assert/strict';
import { parseMission, createMissionPlan, transition, InMemoryMissionPersistence } from '../runtime/engine.mjs';

test('parseMission returns parsed mission context', () => {
  const ctx = parseMission({ id: 'm1', objective: 'Test mission' });
  assert.equal(ctx.state, 'parsed');
  assert.equal(ctx.mission.id, 'm1');
});

test('planner creates verify task and typescript cli tasks', () => {
  const ctx = parseMission({ id: 'm2', objective: 'Create a new TypeScript CLI project with tests' });
  const plan = createMissionPlan(ctx);
  assert.ok(plan.tasks.some((t) => t.kind === 'verify'));
  assert.ok(plan.tasks.some((t) => t.id === 'task-create-package'));
});

test('state transitions enforce valid lifecycle', () => {
  assert.equal(transition('parsed', 'planned'), 'planned');
  assert.throws(() => transition('parsed', 'completed'));
});

test('in-memory persistence saves and loads mission context', async () => {
  const store = new InMemoryMissionPersistence();
  const ctx = parseMission({ id: 'm3', objective: 'Persist mission' });
  await store.save(ctx);
  const loaded = await store.load('m3');
  assert.equal(loaded.mission.id, 'm3');
});
