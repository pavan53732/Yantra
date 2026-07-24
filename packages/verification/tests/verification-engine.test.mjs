import test from 'node:test';
import assert from 'node:assert/strict';
import { verifyMissionEvidence } from '../runtime/engine.mjs';

test('verification engine passes when execution evidence exists', () => {
  const report = verifyMissionEvidence({
    missionId: 'm1',
    evidence: [
      { id: '1', type: 'filesystem', summary: 'wrote file' },
      { id: '2', type: 'verification', summary: 'verified output' }
    ]
  });
  assert.equal(report.passed, true);
  assert.ok(report.outcomes.length >= 4);
});

test('verification engine fails blocking correctness when no execution evidence exists', () => {
  const report = verifyMissionEvidence({ missionId: 'm2', evidence: [] });
  assert.equal(report.passed, false);
  const correctness = report.outcomes.find((o) => o.category === 'correctness');
  assert.equal(correctness.blocking, true);
  assert.equal(correctness.passed, false);
});
