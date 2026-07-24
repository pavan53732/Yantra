import test from 'node:test';
import assert from 'node:assert/strict';

const order = [];

async function startStopModel() {
  const participants = [
    { id: 'one', async start() { order.push('start:one'); }, async stop() { order.push('stop:one'); } },
    { id: 'two', async start() { order.push('start:two'); }, async stop() { order.push('stop:two'); } }
  ];

  for (const p of participants) await p.start();
  for (const p of [...participants].reverse()) await p.stop();
}

test('lifecycle ordering is deterministic in tests', async () => {
  order.length = 0;
  await startStopModel();
  assert.deepEqual(order, ['start:one', 'start:two', 'stop:two', 'stop:one']);
});
