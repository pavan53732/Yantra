import test from 'node:test';
import assert from 'node:assert/strict';
import { VerificationEngine } from '../runtime/engine.mjs';

test('verification engine passes valid evidence and docs', () => {
  const engine = new VerificationEngine();
  const report = engine.run({ evidence: [{ id: '1', type: 'execution', summary: 'ok' }], docs: ['README.md'] });
  assert.equal(report.status, 'PASS');
  assert.equal(report.summary.blocking, 0);
});

test('verification engine fails empty evidence', () => {
  const engine = new VerificationEngine();
  const report = engine.run({ evidence: [], docs: [] });
  assert.equal(report.status, 'FAIL');
  assert.ok(report.summary.blocking > 0);
});
