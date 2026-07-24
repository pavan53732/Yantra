import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { VerificationEngine } from '../runtime/engine.mjs';
const sample = JSON.parse(fs.readFileSync(new URL('../../../output/capability-mission-sample-result.json', import.meta.url), 'utf8'));

test('verification engine validates capability mission evidence artifact', () => {
  const engine = new VerificationEngine();
  const report = engine.run({ evidence: sample.evidence, docs: ['README.md'] });
  assert.equal(report.status, 'PASS');
  assert.ok(report.summary.passed >= 1);
});
