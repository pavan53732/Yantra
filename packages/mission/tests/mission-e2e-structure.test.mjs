import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const engine = fs.readFileSync(path.resolve(__dirname, '../src/engine.ts'), 'utf8');

test('engine includes parse, plan, coordinate, execute, verify, complete pipeline', () => {
  for (const token of ['parseMission', 'createMissionPlan', 'coordinateMission', 'executeTasks', 'verifyMission', 'MissionCompleted']) {
    assert.match(engine, new RegExp(token));
  }
});
