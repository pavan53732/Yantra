import type { MissionContext, MissionEvidence, MissionTask } from './types';

export async function coordinateMission(context: MissionContext, tasks: MissionTask[]): Promise<MissionEvidence[]> {
  return tasks.map((task) => ({
    id: `ev-${task.id}`,
    type: task.kind === 'verify' ? 'verification' : 'execution',
    summary: `Task coordinated: ${task.title}`,
    details: { taskId: task.id, kind: task.kind }
  }));
}
