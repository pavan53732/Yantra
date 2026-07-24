import type { MissionPlan, MissionPlanner, ParsedMission } from './types';

export class DefaultMissionPlanner implements MissionPlanner {
  createPlan(input: ParsedMission): MissionPlan {
    const missionId = input.envelope.id;
    return {
      missionId,
      tasks: [
        {
          id: `${missionId}:task:create-package`,
          title: 'Create package manifest',
          action: 'create-file',
          input: {
            path: 'package.json',
            content: JSON.stringify({ name: 'generated-cli', version: '1.0.0', type: 'module', scripts: { test: 'node --test' } }, null, 2)
          }
        },
        {
          id: `${missionId}:task:create-cli`,
          title: 'Create CLI entrypoint',
          action: 'create-file',
          input: {
            path: 'src/index.ts',
            content: "export function main(){ return 'hello from yantra'; }
"
          }
        },
        {
          id: `${missionId}:task:create-test`,
          title: 'Create test file',
          action: 'create-file',
          input: {
            path: 'tests/index.test.js',
            content: "import test from 'node:test';
import assert from 'node:assert/strict';

test('cli',()=>{ assert.equal(1,1); });
"
          }
        },
        {
          id: `${missionId}:task:init-git`,
          title: 'Initialize git',
          action: 'initialize-git',
          input: {}
        },
        {
          id: `${missionId}:task:run-test`,
          title: 'Run tests',
          action: 'run-command',
          input: { command: 'node --test tests/index.test.js' }
        },
        {
          id: `${missionId}:task:verify`,
          title: 'Verify mission outputs',
          action: 'verify',
          input: {}
        }
      ]
    };
  }
}
