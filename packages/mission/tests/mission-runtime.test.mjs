import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const src = path.resolve(process.cwd(), 'src');

test('mission runtime source files exist', () => {
  for (const file of ['engine.ts','parser.ts','planner.ts','coordinator.ts','execution-pipeline.ts','verification.ts','state-machine.ts','persistence.ts']) {
    assert.equal(fs.existsSync(path.join(src, file)), true);
  }
});

test('mission runtime imports sdk and core layers', () => {
  const engine = fs.readFileSync(path.join(src, 'engine.ts'), 'utf8');
  assert.match(engine, /@yantra\/sdk/);
  assert.match(engine, /@yantra\/core/);
});
