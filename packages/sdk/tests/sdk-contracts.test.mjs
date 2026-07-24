import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const specIndexPath = path.resolve(process.cwd(), 'src/generated/spec-index.json');

test('generated spec index exists', () => {
  assert.equal(fs.existsSync(specIndexPath), true);
});

test('generated spec index has entities', () => {
  const data = JSON.parse(fs.readFileSync(specIndexPath, 'utf8'));
  assert.ok(data.entity_count > 0);
  assert.equal(Array.isArray(data.entities), true);
});
