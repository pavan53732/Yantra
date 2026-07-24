import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { executeCapabilityMission } from '../runtime/mission-executor.mjs';

test('capability mission performs scaffold, test, git, and evidence capture', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'yantra-cap-'));
  const result = await executeCapabilityMission(dir);
  assert.equal(result.success, true);
  assert.ok(result.evidence.length >= 7);
  const pkgTest = result.evidence.find((e) => e.id === 'pkg-test');
  assert.equal(pkgTest.details.code, 0);
});
