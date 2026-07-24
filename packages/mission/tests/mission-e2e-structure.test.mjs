import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const engine = fs.readFileSync(path.resolve(process.cwd(), 'src/engine.ts'), 'utf8');

test('engine includes parse, plan, coordinate, execute, verify, complete pipeline', () => {
  for (const token of ['parseMission', 'createMissionPlan', 'coordinateMission', 'executeTasks', 'verifyMission', 'MissionCompleted']) {
    assert.match(engine, new RegExp(token));
  }
});
