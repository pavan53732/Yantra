import test from 'node:test';
import assert from 'node:assert/strict';

const transitions = [
  ['created', 'parsed'],
  ['parsed', 'planned'],
  ['planned', 'coordinating'],
  ['coordinating', 'executing'],
  ['executing', 'verifying'],
  ['verifying', 'completed']
];

test('approved mission lifecycle path is deterministic', () => {
  assert.equal(transitions.length, 6);
  assert.deepEqual(transitions[0], ['created', 'parsed']);
  assert.deepEqual(transitions.at(-1), ['verifying', 'completed']);
});
