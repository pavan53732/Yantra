import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const root = path.resolve(process.cwd(), 'src');

test('mission source files exist', () => {
  for (const file of ['engine.ts','parser.ts','planner.ts','coordinator.ts','verifier.ts','runtime.ts','state-machine.ts']) {
    assert.equal(fs.existsSync(path.join(root, file)), true);
  }
});

test('state machine allows expected transitions', () => {
  const source = fs.readFileSync(path.join(root, 'state-machine.ts'), 'utf8');
  assert.match(source, /created: \['parsed', 'failed'\]/);
  assert.match(source, /verifying: \['completed', 'failed'\]/);
});
