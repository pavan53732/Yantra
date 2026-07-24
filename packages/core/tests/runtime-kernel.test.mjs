import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const src = path.resolve(process.cwd(), 'src');

test('core source files exist', () => {
  for (const file of ['bootstrap.ts','container.ts','event-bus.ts','configuration.ts','logger.ts','lifecycle.ts','errors.ts','types.ts']) {
    assert.equal(fs.existsSync(path.join(src, file)), true);
  }
});

test('core imports sdk contracts', () => {
  const bootstrap = fs.readFileSync(path.join(src, 'bootstrap.ts'), 'utf8');
  assert.match(bootstrap, /@yantra\/sdk/);
});
