import test from 'node:test';
import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

test('mission demo artifacts contract is present', () => {
  const planner = fs.readFileSync(path.resolve(process.cwd(), 'src/planner.ts'), 'utf8');
  assert.match(planner, /create-file/);
  assert.match(planner, /initialize-git/);
  assert.match(planner, /run-command/);
  assert.match(planner, /verify/);
});
