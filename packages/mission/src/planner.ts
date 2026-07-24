import type { MissionContext, MissionPlan, MissionTask } from './types';

export function createMissionPlan(context: MissionContext): MissionPlan {
  const objective = context.mission.objective.toLowerCase();
  const tasks: MissionTask[] = [
    { id: 'task-analyze', title: 'Analyze mission objective', kind: 'analyze', input: { objective: context.mission.objective } }
  ];

  if (objective.includes('typescript cli')) {
    tasks.push({ id: 'task-create-package', title: 'Create package.json', kind: 'create-file', input: { path: 'package.json' } });
    tasks.push({ id: 'task-run-tests', title: 'Run tests', kind: 'run-command', input: { command: 'npm test' } });
  }

  tasks.push({ id: 'task-verify', title: 'Verify mission output', kind: 'verify' });
  return { missionId: context.mission.id, tasks };
}
