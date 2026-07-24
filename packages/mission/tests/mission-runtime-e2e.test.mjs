import test from 'node:test';
import assert from 'node:assert/strict';
import { MissionEngine, MemoryEventBus } from '../runtime/engine.mjs';

test('mission runtime executes an end-to-end sample mission', async () => {
  const kernel = { events: new MemoryEventBus() };
  const engine = new MissionEngine({ kernel });
  const result = await engine.run({
    id: 'mission-ts-cli',
    objective: 'Create a new TypeScript CLI project with tests',
    priority: 'high'
  });

  assert.equal(result.success, true);
  assert.equal(result.finalState, 'completed');
  assert.ok(result.evidence.length >= 5);
  assert.ok(result.events.length >= 5);
  assert.equal(kernel.events.history().length, result.events.length);
});
